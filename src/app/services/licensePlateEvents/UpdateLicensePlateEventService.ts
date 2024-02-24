import { instanceToInstance } from 'class-transformer';
import { isNil, omitBy } from 'lodash';
import { Server } from 'socket.io';
import { inject, injectable } from 'tsyringe';

import { IStorageProvider } from '@app/containers/providers/StorageProvider/models/IStorageProvider';
import { ILicensePlateEventRepository } from '@app/repositories';
import { AppError } from '@errors/AppError';
import { LicensePlateEvent } from '@orm/entities';
import { ESocketTypeEvent } from '@utils/enums';

interface IRequest {
  license_plate_event_id: string;
  image_name?: string;
  plate?: string;
  latitude?: number;
  longitude?: number;

  io: Server;
}

@injectable()
class UpdateLicensePlateEventService {
  constructor(
    @inject('LicensePlateEventRepository')
    private licensePlateEventRepository: ILicensePlateEventRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    license_plate_event_id,
    image_name,
    plate,
    latitude,
    longitude,
    io,
  }: IRequest): Promise<LicensePlateEvent> {
    const licensePlateEvent = await this.licensePlateEventRepository.findById(
      license_plate_event_id,
    );

    if (!licensePlateEvent) {
      throw new AppError('License plate event does not exist!', 404);
    }

    if (image_name) {
      if (licensePlateEvent.image_name) {
        await this.storageProvider.deleteFile(
          licensePlateEvent.image_name,
          'imgs',
        );
      }

      await this.storageProvider.saveFile(image_name, 'imgs');
    }

    Object.assign(
      licensePlateEvent,
      omitBy({ plate, image_name, latitude, longitude }, isNil),
    );

    const newLicensePlateEvent = await this.licensePlateEventRepository.save(
      licensePlateEvent,
    );

    io.emit(ESocketTypeEvent.UPDATE, instanceToInstance(newLicensePlateEvent));

    return newLicensePlateEvent;
  }
}
export { UpdateLicensePlateEventService };
