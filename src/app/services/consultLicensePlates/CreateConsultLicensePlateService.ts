import { IResponsePagazulApiDTO } from 'api/pagazulApi/dtos';
import { Server } from 'socket.io';
import { inject, injectable } from 'tsyringe';

import { pagazulApi } from '@api/index';
import { IStorageProvider } from '@app/containers/providers/StorageProvider/models/IStorageProvider';
import {
  IConsultLicensePlateRepository,
  IPagazulRepository,
  IUltimateAlprRepository,
} from '@app/repositories';
import { Pagazul, UltimateAlpr } from '@app/typeorm/schemas';
import { AppError } from '@errors/AppError';
import { ConsultLicensePlate } from '@orm/entities';
import { consultOcr } from '@utils/consultOcr';
import { validateLicensePlate } from '@utils/validateLicensePlate';

interface IRequest {
  image_name?: string;
  plate?: string;
  camera_id?: string;
  date_hour: string;
  latitude?: number;
  longitude?: number;

  io: Server;
}

@injectable()
class CreateConsultLicensePlateService {
  constructor(
    @inject('ConsultLicensePlateRepository')
    private consultLicensePlateRepository: IConsultLicensePlateRepository,

    @inject('UltimateAlprRepository')
    private ultimateAlprRepository: IUltimateAlprRepository,

    @inject('PagazulRepository')
    private pagazulRepository: IPagazulRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    image_name,
    plate,
    date_hour,
    camera_id,
    latitude,
    longitude,
    io,
  }: IRequest): Promise<ConsultLicensePlate> {
    let ultimateAlpr: UltimateAlpr;
    let plate_end: string;
    if (image_name) {
      try {
        const response = await consultOcr(image_name);

        if (!validateLicensePlate(response.plates[0].text)) {
          throw new AppError('Invalid license plate!', 400);
        }

        ultimateAlpr = await this.ultimateAlprRepository.create({
          detections: response.plates,
        });

        plate_end = ultimateAlpr.detections[0].text;
      } catch (error) {
        throw new AppError('Error when querying license plate!', 400);
      }
      await this.storageProvider.saveFile(image_name, 'consults');
    } else if (plate) {
      if (!validateLicensePlate(plate)) {
        throw new AppError('Invalid license plate!', 400);
      }
      plate_end = plate;
    } else {
      throw new AppError('No image and no license plate to be consulted!', 400);
    }

    const consultLicense = await this.consultLicensePlateRepository.create({
      image_name,
      plate: plate_end,
      date_hour,
      camera_id,
      latitude,
      longitude,
    });

    if (ultimateAlpr) {
      Object.assign(ultimateAlpr, {
        external_consult_license_plate_id: consultLicense.id,
      });
      await this.ultimateAlprRepository.save(ultimateAlpr);
    }

    let pagazul: Pagazul;
    try {
      const response = await pagazulApi.get('/placa/cad', {
        params: { plate: plate_end },
      });

      const data = response.data as IResponsePagazulApiDTO;
      const pagazul_data = {
        external_consult_license_plate_id: consultLicense.id,
        ...data,
      };
      pagazul = await this.pagazulRepository.create(pagazul_data);

      Object.assign(consultLicense, {
        pagazul_expired: pagazul.expired,
        pagazul_status: pagazul.status,
        external_pagazul_id: pagazul.id,
      });
      await this.consultLicensePlateRepository.save(consultLicense);

      Object.assign(consultLicense, { external_pagazul: pagazul });
    } catch (error) {
      const { data } = error.response;
      Object.assign(data, { origin: 'PAGAZUL' });
      console.error(data);

      Object.assign(consultLicense, {
        message_error: JSON.stringify(data),
      });
    }

    // io.emit(
    //   ESocketTypeEvent.CONSULT_CREATE,
    //   instanceToInstance(consultLicense),
    // );

    return consultLicense;
  }
}
export { CreateConsultLicensePlateService };
