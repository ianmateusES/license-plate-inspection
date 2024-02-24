import { inject, injectable } from 'tsyringe';

import {
  IConsultLicensePlateRepository,
  IPagazulRepository,
} from '@app/repositories';
import { AppError } from '@errors/AppError';
import { ConsultLicensePlate } from '@orm/entities';

interface IRequest {
  consult_license_plate_id: string;
}

@injectable()
class ShowConsultLicensePlateService {
  constructor(
    @inject('ConsultLicensePlateRepository')
    private consultLicensePlateRepository: IConsultLicensePlateRepository,

    @inject('PagazulRepository')
    private pagazulRepository: IPagazulRepository,
  ) {}

  public async execute({
    consult_license_plate_id,
  }: IRequest): Promise<ConsultLicensePlate> {
    const consultLicensePlate =
      await this.consultLicensePlateRepository.findById(
        consult_license_plate_id,
      );

    if (!consultLicensePlate) {
      throw new AppError('License plate event does not exist!', 404);
    }

    Object.assign(consultLicensePlate, {
      external_pagazul: await this.pagazulRepository.findById(
        consultLicensePlate.external_pagazul_id,
      ),
    });

    return consultLicensePlate;
  }
}
export { ShowConsultLicensePlateService };
