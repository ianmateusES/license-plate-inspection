import { inject, injectable } from 'tsyringe';

import {
  IConsultLicensePlateRepository,
  IPagazulRepository,
} from '@app/repositories';
import { ConsultLicensePlate } from '@orm/entities';
import {
  IPagination,
  calculateMeta,
  calculateTakeSkip,
} from '@utils/pagination';

interface IRequest {
  page: number;
  size: number;
}

@injectable()
class ListConsultLicensePlateService {
  constructor(
    @inject('ConsultLicensePlateRepository')
    private consultLicensePlateRepository: IConsultLicensePlateRepository,

    @inject('PagazulRepository')
    private pagazulRepository: IPagazulRepository,
  ) {}

  public async execute({
    page = 1,
    size = 100,
  }: IRequest): Promise<IPagination<ConsultLicensePlate>> {
    const { skip, take } = calculateTakeSkip(page, size);

    const { data, count } = await this.consultLicensePlateRepository.findAll(
      skip,
      take,
    );

    await Promise.all(
      data.map(async licensePlateEvent => {
        Object.assign(licensePlateEvent, {
          external_pagazul: await this.pagazulRepository.findById(
            licensePlateEvent.external_pagazul_id,
          ),
        });
      }),
    );

    return { data, meta: calculateMeta(take, skip, count) };
  }
}
export { ListConsultLicensePlateService };
