import { Server } from 'socket.io';
import { inject, injectable } from 'tsyringe';

import { IStorageProvider } from '@app/containers/providers/StorageProvider/models/IStorageProvider';
import { ILicensePlateEventRepository } from '@app/repositories';
import { AppError } from '@errors/AppError';
import { ESocketTypeEvent } from '@utils/enums';

interface IRequest {
  license_plate_event_id: string;

  io: Server;
}

@injectable()
class DeleteLicensePlateEventService {
  constructor(
    @inject('LicensePlateEventRepository')
    private licensePlateEventRepository: ILicensePlateEventRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    license_plate_event_id,
    io,
  }: IRequest): Promise<void> {
    const licensePlateEvent = await this.licensePlateEventRepository.findById(
      license_plate_event_id,
    );

    if (!licensePlateEvent) {
      throw new AppError('License plate event does not exist!', 404);
    }

    if (licensePlateEvent.image_name) {
      this.storageProvider.deleteFile(licensePlateEvent.image_name, 'imgs');
    }

    await this.licensePlateEventRepository.delete(license_plate_event_id);

    io.emit(ESocketTypeEvent.DELETE, { license_plate_event_id });
  }
}

export { DeleteLicensePlateEventService };
