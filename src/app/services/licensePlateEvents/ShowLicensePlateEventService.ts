import { inject, injectable } from 'tsyringe';

import {
  ILicensePlateEventRepository,
  IPagazulRepository,
} from '@app/repositories';
import { AppError } from '@errors/AppError';
import { LicensePlateEvent } from '@orm/entities';

interface IRequest {
  license_plate_event_id: string;
}

@injectable()
class ShowLicensePlateEventService {
  constructor(
    @inject('LicensePlateEventRepository')
    private licensePlateEventRepository: ILicensePlateEventRepository,

    @inject('PagazulRepository')
    private pagazulRepository: IPagazulRepository,
  ) {}

  public async execute({
    license_plate_event_id,
  }: IRequest): Promise<LicensePlateEvent> {
    const licensePlateEvent = await this.licensePlateEventRepository.findById(
      license_plate_event_id,
    );

    if (!licensePlateEvent) {
      throw new AppError('License plate event does not exist!', 404);
    }

    Object.assign(licensePlateEvent, {
      external_pagazul: await this.pagazulRepository.findById(
        licensePlateEvent.external_pagazul_id,
      ),
    });

    return licensePlateEvent;
  }
}
export { ShowLicensePlateEventService };
