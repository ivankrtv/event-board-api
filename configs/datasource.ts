import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

import { loadConfig } from './configuration';

dotenv.config();
const { db } = loadConfig();

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: db.host,
  port: Number(db.port),
  username: db.username,
  password: db.password,
  database: db.database,
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
