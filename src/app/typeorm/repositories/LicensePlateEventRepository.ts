import { FindOperator, In, IsNull, Repository } from 'typeorm';

import {
  ICreateLicensePlateEventDTO,
  IFilterLicensePlateEventDTO,
} from '@app/dtos';
import { ILicensePlateEventRepository } from '@app/repositories';
import { dataSourcePostgres } from '@database/index';
import { IResponsePagination } from '@utils/pagination';

import { LicensePlateEvent } from '../entities';

class LicensePlateEventRepository implements ILicensePlateEventRepository {
  private repository: Repository<LicensePlateEvent>;

  constructor() {
    this.repository = dataSourcePostgres.getRepository(LicensePlateEvent);
  }

  public async findById(id: string): Promise<LicensePlateEvent> {
    const licensePlateEvent = await this.repository.findOneBy({ id });

    return licensePlateEvent;
  }

  public async findAll(
    skip: number,
    take: number,
    {
      camera_ids,
      plates,
      external_pagazul_id,
      pagazul_expired,
      pagazul_status,
    }: IFilterLicensePlateEventDTO,
  ): Promise<IResponsePagination<LicensePlateEvent>> {
    let filter_pagazul_expired: boolean | FindOperator<null> | undefined;
    if (pagazul_expired === 'null') {
      filter_pagazul_expired = IsNull();
    } else if (pagazul_expired) {
      filter_pagazul_expired = Boolean(pagazul_expired);
    }

    let filter_pagazul_status: boolean | FindOperator<null> | undefined;
    if (pagazul_status === 'null') {
      filter_pagazul_status = IsNull();
    } else if (pagazul_status) {
      filter_pagazul_status = Boolean(pagazul_status);
    }

    const [licensePlateEvents, count] = await this.repository.findAndCount({
      where: {
        plate: plates && plates.length ? In(plates) : undefined,
        camera_id: camera_ids && camera_ids.length ? In(camera_ids) : undefined,
        external_pagazul_id,
        pagazul_expired: filter_pagazul_expired,
        pagazul_status: filter_pagazul_status,
      },
      skip,
      take,
      order: {
        created_at: 'DESC',
      },
    });

    return { data: licensePlateEvents, count };
  }

  public async create(
    data: ICreateLicensePlateEventDTO,
  ): Promise<LicensePlateEvent> {
    const licensePlateEvent = this.repository.create(data);

    await this.repository.save(licensePlateEvent);

    return licensePlateEvent;
  }

  public async save(
    licensePlateEvent: LicensePlateEvent,
  ): Promise<LicensePlateEvent> {
    const newLicensePlateEvent = await this.repository.save(licensePlateEvent);

    return newLicensePlateEvent;
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { LicensePlateEventRepository };
