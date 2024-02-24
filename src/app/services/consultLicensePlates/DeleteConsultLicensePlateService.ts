import { Server } from 'socket.io';
import { inject, injectable } from 'tsyringe';

import { IStorageProvider } from '@app/containers/providers/StorageProvider/models/IStorageProvider';
import { IConsultLicensePlateRepository } from '@app/repositories';
import { AppError } from '@errors/AppError';

interface IRequest {
  consult_license_plate_id: string;

  io: Server;
}

@injectable()
class DeleteConsultLicensePlateService {
  constructor(
    @inject('ConsultLicensePlateRepository')
    private consultLicensePlateRepository: IConsultLicensePlateRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    consult_license_plate_id,
    io,
  }: IRequest): Promise<void> {
    const consultLicensePlate =
      await this.consultLicensePlateRepository.findById(
        consult_license_plate_id,
      );

    if (!consultLicensePlate) {
      throw new AppError('License plate event does not exist!', 404);
    }

    await Promise.all([
      this.storageProvider.deleteFile(consultLicensePlate.image_name, 'imgs'),
      this.consultLicensePlateRepository.delete(consult_license_plate_id),
    ]);

    // io.emit(ESocketTypeEvent.DELETE, { consult_license_plate_id });
  }
}
export { DeleteConsultLicensePlateService };
