import { ConsultLicensePlate } from '@orm/entities';
import { IResponsePagination } from '@utils/pagination';

import {
  ICreateConsultLicensePlateDTO,
  IFilterConsultLicensePlateDTO,
} from '../dtos';

interface IConsultLicensePlateRepository {
  findById(id: string): Promise<ConsultLicensePlate>;
  findAll(
    skip: number,
    take: number,
  ): Promise<IResponsePagination<ConsultLicensePlate>>;
  findByPlateLastDate(
    date: IFilterConsultLicensePlateDTO,
  ): Promise<ConsultLicensePlate>;
  create(data: ICreateConsultLicensePlateDTO): Promise<ConsultLicensePlate>;
  save(consultLicensePlate: ConsultLicensePlate): Promise<ConsultLicensePlate>;
  delete(id: string): Promise<void>;
}

export { IConsultLicensePlateRepository };
