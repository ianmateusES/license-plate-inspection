import {
  ICreateLicensePlateEventDTO,
  IFilterLicensePlateEventDTO,
} from '@app/dtos';
import { LicensePlateEvent } from '@orm/entities';
import { IResponsePagination } from '@utils/pagination';

interface ILicensePlateEventRepository {
  findById(id: string): Promise<LicensePlateEvent>;
  findAll(
    skip: number,
    take: number,
    filter?: IFilterLicensePlateEventDTO,
  ): Promise<IResponsePagination<LicensePlateEvent>>;
  create(data: ICreateLicensePlateEventDTO): Promise<LicensePlateEvent>;
  save(licensePlateEvent: LicensePlateEvent): Promise<LicensePlateEvent>;
  delete(id: string): Promise<void>;
}

export { ILicensePlateEventRepository };
