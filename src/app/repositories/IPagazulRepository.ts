import { ICreatePagazulDTO } from '@app/dtos';
import { Pagazul } from '@orm/schemas';
import { IResponsePagination } from '@utils/pagination';

interface IPagazulRepository {
  findById(id: string): Promise<Pagazul>;
  findAll(skip: number, take: number): Promise<IResponsePagination<Pagazul>>;
  create(data: ICreatePagazulDTO): Promise<Pagazul>;
  save(pagazul: Pagazul): Promise<Pagazul>;
  delete(id: string): Promise<void>;
}

export { IPagazulRepository };
