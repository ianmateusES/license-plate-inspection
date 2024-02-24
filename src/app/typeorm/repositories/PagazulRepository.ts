import { MongoRepository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { ICreatePagazulDTO } from '@app/dtos';
import { IPagazulRepository } from '@app/repositories';
import { dataSourceMongo } from '@database/index';
import { IResponsePagination } from '@utils/pagination';

import { Pagazul } from '../schemas';

class PagazulRepository implements IPagazulRepository {
  private repository: MongoRepository<Pagazul>;

  constructor() {
    this.repository = dataSourceMongo.getMongoRepository(Pagazul);
  }

  public async findById(id: string): Promise<Pagazul> {
    const pagazul = await this.repository.findOneBy({ id });

    return pagazul;
  }

  public async findAll(
    skip: number,
    take: number,
  ): Promise<IResponsePagination<Pagazul>> {
    const [pagazul, count] = await this.repository.findAndCount({
      skip,
      take,
      order: {
        created_at: 'DESC',
      },
    });

    return { data: pagazul, count };
  }

  public async create(data: ICreatePagazulDTO): Promise<Pagazul> {
    Object.assign(data, { id: uuidV4() });
    const pagazul = this.repository.create(data);

    await this.repository.save(pagazul);

    return pagazul;
  }

  public async save(pagazul: Pagazul): Promise<Pagazul> {
    const newPagazul = await this.repository.save(pagazul);

    return newPagazul;
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete({ id });
  }
}

export { PagazulRepository };
