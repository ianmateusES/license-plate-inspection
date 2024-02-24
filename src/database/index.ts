import dataSourceMongo, { createConnectionMongo } from './mongodb';
import dataSourcePostgres, { createConnectionPostgres } from './postgresdb';

export {
  dataSourcePostgres,
  createConnectionPostgres,
  dataSourceMongo,
  createConnectionMongo,
};
