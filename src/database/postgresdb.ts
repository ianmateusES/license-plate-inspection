import { DataSource } from 'typeorm';

import { LicensePlateEvent, ConsultLicensePlate } from '@orm/entities';

import {
  UseExtensionUuid1655357692603,
  LicensePlateEvents1688974457883,
  ConsultLicensePlates1689558518129,
  AddCameraConsultLicensePlates1689759184880,
  AddCameraLicensePlateEvents1689759165530,
  AddLabelLicensePlateEvents1690673816315,
} from './migrations';

const dataSource = new DataSource({
  type: 'postgres',
  port: 5432,
  host: process.env.POSTGRES_HOST || 'localhost',
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database:
    process.env.NODE_ENV === 'test'
      ? `${process.env.POSTGRES_DATABASE}_test`
      : process.env.POSTGRES_DATABASE,
  entities: [LicensePlateEvent, ConsultLicensePlate],
  migrations: [
    UseExtensionUuid1655357692603,
    LicensePlateEvents1688974457883,
    ConsultLicensePlates1689558518129,
    AddCameraLicensePlateEvents1689759165530,
    AddCameraConsultLicensePlates1689759184880,
    AddLabelLicensePlateEvents1690673816315,
  ],
});

const createConnectionPostgres = (host = 'postgres'): Promise<DataSource> => {
  return dataSource.setOptions({ host }).initialize();
};

export { createConnectionPostgres };

export default dataSource;
