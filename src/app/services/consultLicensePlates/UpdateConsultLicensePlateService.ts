import { isNil, omitBy } from 'lodash';
import { Server } from 'socket.io';
import { inject, injectable } from 'tsyringe';

import { IStorageProvider } from '@app/containers/providers/StorageProvider/models/IStorageProvider';
import { IConsultLicensePlateRepository } from '@app/repositories';
import { AppError } from '@errors/AppError';
import { ConsultLicensePlate } from '@orm/entities';

interface IRequest {
  consult_license_plate_id: string;
  image_name?: string;
  plate?: string;

  io: Server;
}

@injectable()
class UpdateConsultLicensePlateService {
  constructor(
    @inject('ConsultLicensePlateRepository')
    private consultLicensePlateRepository: IConsultLicensePlateRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    consult_license_plate_id,
    image_name,
    plate,
    io,
  }: IRequest): Promise<ConsultLicensePlate> {
    const consultLicensePlate =
      await this.consultLicensePlateRepository.findById(
        consult_license_plate_id,
      );

    if (!consultLicensePlate) {
      throw new AppError('License plate event does not exist!', 404);
    }

    if (image_name) {
      await Promise.all([
        this.storageProvider.deleteFile(consultLicensePlate.image_name, 'imgs'),
        this.storageProvider.saveFile(image_name, 'imgs'),
      ]);
    }

    Object.assign(consultLicensePlate, omitBy({ plate, image_name }, isNil));

    const newConsultLicensePlate =
      await this.consultLicensePlateRepository.save(consultLicensePlate);

    // io.emit(ESocketTypeEvent.UPDATE, instanceToInstance(newConsultLicensePlate));

    return newConsultLicensePlate;
  }
}
export { UpdateConsultLicensePlateService };
