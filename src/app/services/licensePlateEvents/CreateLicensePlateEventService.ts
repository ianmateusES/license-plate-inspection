import { IResponsePagazulApiDTO } from 'api/pagazulApi/dtos';
import { instanceToInstance } from 'class-transformer';
import path from 'path';
import sharp from 'sharp';
import { Server } from 'socket.io';
import { inject, injectable } from 'tsyringe';

import { pagazulApi } from '@api/index';
import { ICacheProvider } from '@app/containers/providers/CacheProvider/models/ICacheProvider';
import { IStorageProvider } from '@app/containers/providers/StorageProvider/models/IStorageProvider';
import {
  ILicensePlateEventRepository,
  IPagazulRepository,
  IUltimateAlprRepository,
} from '@app/repositories';
import { Pagazul, UltimateAlpr } from '@app/typeorm/schemas';
import { configUpload } from '@config/upload';
import { AppError } from '@errors/AppError';
import { LicensePlateEvent } from '@orm/entities';
import { consultOcr } from '@utils/consultOcr';
import { ESocketTypeEvent } from '@utils/enums';
import { validateLicensePlate } from '@utils/validateLicensePlate';

interface IRequest {
  image_name: string;
  plate?: string;
  label?: string;
  date_hour: string;
  camera_id?: string;
  latitude?: number;
  longitude?: number;

  bound_box: {
    x_min: number;
    y_min: number;
    x_max: number;
    y_max: number;
  };

  io: Server;
}

@injectable()
class CreateLicensePlateEventService {
  constructor(
    @inject('LicensePlateEventRepository')
    private licensePlateEventRepository: ILicensePlateEventRepository,

    @inject('PagazulRepository')
    private pagazulRepository: IPagazulRepository,

    @inject('UltimateAlprRepository')
    private ultimateAlprRepository: IUltimateAlprRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    image_name,
    plate,
    label,
    bound_box,
    date_hour,
    camera_id,
    latitude,
    longitude,
    io,
  }: IRequest): Promise<LicensePlateEvent> {
    let ultimateAlpr: UltimateAlpr;
    let plate_end: string;
    if (!plate) {
      try {
        const cropeed_image_name = `cropeed_${image_name}`;
        await sharp(path.resolve(configUpload.tmpFolder, image_name))
          .extract({
            left: bound_box.x_min,
            top: bound_box.y_min,
            width: bound_box.x_max - bound_box.x_min,
            height: bound_box.y_max - bound_box.y_min,
          })
          .toFile(path.resolve(configUpload.tmpFolder, cropeed_image_name));

        const response = await consultOcr(cropeed_image_name, true);

        const plateReturn = response.plates[0].text;
        if (!validateLicensePlate(plateReturn)) {
          throw new AppError('Invalid license plate!', 400);
        }

        const result = await this.cacheProvider.recover<string>(
          `LICENSE_PLATE_EVENT:${plateReturn}`,
        );
        if (result) {
          return JSON.parse(result);
        }

        ultimateAlpr = await this.ultimateAlprRepository.create({
          detections: response.plates,
        });

        plate_end = ultimateAlpr.detections[0].text;
      } catch (error) {
        console.error(error);
        throw new AppError('Error when querying license plate!', 400);
      }
    } else {
      if (!validateLicensePlate(plate)) {
        throw new AppError('Invalid license plate!', 400);
      }

      const result = await this.cacheProvider.recover<string>(
        `LICENSE_PLATE_EVENT:${plate}`,
      );
      if (result) {
        return JSON.parse(result);
      }

      plate_end = plate;
    }

    await this.storageProvider.saveFile(image_name, 'imgs');

    const licensePlateEvent = await this.licensePlateEventRepository.create({
      image_name,
      plate: plate_end,
      bound_box: bound_box ? JSON.stringify(bound_box) : undefined,
      label,
      date_hour,
      camera_id,
      latitude,
      longitude,
    });

    if (ultimateAlpr) {
      Object.assign(ultimateAlpr, {
        external_license_plate_event_id: licensePlateEvent.id,
      });
      await this.ultimateAlprRepository.save(ultimateAlpr);
    }

    let pagazul: Pagazul;
    try {
      const response = await pagazulApi.get('/placa/cad', {
        params: { plate: plate_end, date: date_hour },
      });

      const data = response.data as IResponsePagazulApiDTO;
      const pagazul_data = {
        external_license_plate_event_id: licensePlateEvent.id,
        ...data,
      };
      pagazul = await this.pagazulRepository.create(pagazul_data);

      Object.assign(licensePlateEvent, {
        external_pagazul_id: pagazul.id,
        pagazul_expired: pagazul.expired,
        pagazul_status: pagazul.status,
      });
      await this.licensePlateEventRepository.save(licensePlateEvent);

      Object.assign(licensePlateEvent, {
        external_pagazul: pagazul,
      });
    } catch (error) {
      const { data } = error.response;
      Object.assign(data, { origin: 'PAGAZUL' });
      console.error(data);

      Object.assign(licensePlateEvent, {
        message_error: JSON.stringify(data),
      });
    }

    await this.cacheProvider.save(
      `LICENSE_PLATE_EVENT:${licensePlateEvent.plate}`,
      JSON.stringify(licensePlateEvent),
      30,
    );

    io.emit(ESocketTypeEvent.CREATE, instanceToInstance(licensePlateEvent));

    return licensePlateEvent;
  }
}
export { CreateLicensePlateEventService };
