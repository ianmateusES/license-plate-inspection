import { DataSource, DataSourceOptions } from 'typeorm';

import { Pagazul, UltimateAlpr } from '../app/typeorm/schemas';

const connectionOptions = {
  localhost: {
    host: 'localhost',
    port: 27017,
    database: process.env.MONGODB_DATABASE || 'mongo',
    // username: process.env.MONGODB_USERNAME || 'mongo',
    // password: process.env.MONGODB_PASSWORD || 'mongo',
  } as DataSourceOptions,
  externalhost: {
    url: process.env.HOST_MONGO,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as DataSourceOptions,
};

const dataSourceMongo = new DataSource({
  type: 'mongodb',
  ...connectionOptions[process.env.MONGODB_HOST_TYPE || 'localhost'],
  entities: [Pagazul, UltimateAlpr],
  useUnifiedTopology: true,
});

const createConnectionMongo = (): Promise<DataSource> => {
  return dataSourceMongo.initialize();
};

export { createConnectionMongo };

export default dataSourceMongo;
