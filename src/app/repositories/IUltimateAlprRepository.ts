import { ICreateUltimateAlprDTO } from '@app/dtos';
import { UltimateAlpr } from '@orm/schemas';
import { IResponsePagination } from '@utils/pagination';

interface IUltimateAlprRepository {
  findById(id: string): Promise<UltimateAlpr>;
  findAll(
    skip: number,
    take: number,
  ): Promise<IResponsePagination<UltimateAlpr>>;
  create(data: ICreateUltimateAlprDTO): Promise<UltimateAlpr>;
  save(ultimateAlpr: UltimateAlpr): Promise<UltimateAlpr>;
  delete(id: string): Promise<void>;
}

export { IUltimateAlprRepository };
