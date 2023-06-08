import { loadConfig } from './configuration';

const { db } = loadConfig();

export const dbConfig = {
  type: 'postgres',
  host: db.host,
  port: Number(db.port),
  username: db.username,
  password: db.password,
  database: db.database,
  entities: process.env.NODE_ENV === 'test' ? ['src/**/*.entity.ts'] : ['dist/**/*.entity.js'],
  synchronize: false,
};
