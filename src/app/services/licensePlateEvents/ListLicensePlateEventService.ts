import { inject, injectable } from 'tsyringe';

import {
  ILicensePlateEventRepository,
  IPagazulRepository,
} from '@app/repositories';
import { LicensePlateEvent } from '@orm/entities';
import {
  IPagination,
  calculateMeta,
  calculateTakeSkip,
} from '@utils/pagination';

interface IRequest {
  page: number;
  size: number;

  plates?: string[];
  pagazul_status?: string;
  pagazul_expired?: string;
  camera_ids?: string[];
  external_pagazul_id?: string;
}

@injectable()
class ListLicensePlateEventService {
  constructor(
    @inject('LicensePlateEventRepository')
    private licensePlateEventRepository: ILicensePlateEventRepository,

    @inject('PagazulRepository')
    private pagazulRepository: IPagazulRepository,
  ) {}

  public async execute({
    page = 1,
    size = 100,
    camera_ids,
    external_pagazul_id,
    pagazul_expired,
    pagazul_status,
    plates,
  }: IRequest): Promise<IPagination<LicensePlateEvent>> {
    const { skip, take } = calculateTakeSkip(page, size);

    const { data, count } = await this.licensePlateEventRepository.findAll(
      skip,
      take,
      {
        camera_ids,
        external_pagazul_id,
        pagazul_expired,
        pagazul_status,
        plates,
      },
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
export { ListLicensePlateEventService };
