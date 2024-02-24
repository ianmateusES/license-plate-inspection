import { MoreThanOrEqual, Repository } from 'typeorm';

import {
  ICreateConsultLicensePlateDTO,
  IFilterConsultLicensePlateDTO,
} from '@app/dtos';
import { IConsultLicensePlateRepository } from '@app/repositories';
import { dataSourcePostgres } from '@database/index';
import { IResponsePagination } from '@utils/pagination';

import { ConsultLicensePlate } from '../entities';

class ConsultLicensePlateRepository implements IConsultLicensePlateRepository {
  private repository: Repository<ConsultLicensePlate>;

  constructor() {
    this.repository = dataSourcePostgres.getRepository(ConsultLicensePlate);
  }

  public async findById(id: string): Promise<ConsultLicensePlate> {
    const consultLicensePlate = await this.repository.findOneBy({ id });

    return consultLicensePlate;
  }

  public async findAll(
    skip: number,
    take: number,
  ): Promise<IResponsePagination<ConsultLicensePlate>> {
    const [consultLicensePlates, count] = await this.repository.findAndCount({
      skip,
      take,
      order: {
        created_at: 'DESC',
      },
    });

    return { data: consultLicensePlates, count };
  }

  public async findByPlateLastDate({
    plate,
    created_at,
  }: IFilterConsultLicensePlateDTO): Promise<ConsultLicensePlate> {
    const consultLicensePlate = await this.repository.findOne({
      where: {
        plate,
        created_at: MoreThanOrEqual(created_at),
      },
      order: {
        created_at: 'DESC',
      },
    });

    return consultLicensePlate;
  }

  public async create(
    data: ICreateConsultLicensePlateDTO,
  ): Promise<ConsultLicensePlate> {
    const consultLicensePlate = this.repository.create(data);

    await this.repository.save(consultLicensePlate);

    return consultLicensePlate;
  }

  public async save(
    consultLicensePlate: ConsultLicensePlate,
  ): Promise<ConsultLicensePlate> {
    const newConsultLicensePlate = await this.repository.save(
      consultLicensePlate,
    );

    return newConsultLicensePlate;
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { ConsultLicensePlateRepository };
