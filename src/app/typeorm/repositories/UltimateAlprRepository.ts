import { MongoRepository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { ICreateUltimateAlprDTO } from '@app/dtos';
import { IUltimateAlprRepository } from '@app/repositories';
import { dataSourceMongo } from '@database/index';
import { IResponsePagination } from '@utils/pagination';

import { UltimateAlpr } from '../schemas';

class UltimateAlprRepository implements IUltimateAlprRepository {
  private repository: MongoRepository<UltimateAlpr>;

  constructor() {
    this.repository = dataSourceMongo.getMongoRepository(UltimateAlpr);
  }

  public async findById(id: string): Promise<UltimateAlpr> {
    const ultimateAlpr = await this.repository.findOneBy({ id });

    return ultimateAlpr;
  }

  public async findAll(
    skip: number,
    take: number,
  ): Promise<IResponsePagination<UltimateAlpr>> {
    const [ultimateAlprs, count] = await this.repository.findAndCount({
      skip,
      take,
      order: {
        created_at: 'DESC',
      },
    });

    return { data: ultimateAlprs, count };
  }

  public async create(data: ICreateUltimateAlprDTO): Promise<UltimateAlpr> {
    Object.assign(data, { id: uuidV4() });
    const ultimateAlpr = this.repository.create(data);

    await this.repository.save(ultimateAlpr);

    return ultimateAlpr;
  }

  public async save(ultimateAlpr: UltimateAlpr): Promise<UltimateAlpr> {
    const newUltimateAlpr = await this.repository.save(ultimateAlpr);

    return newUltimateAlpr;
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete({ id });
  }
}

export { UltimateAlprRepository };
