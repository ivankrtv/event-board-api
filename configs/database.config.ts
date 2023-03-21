import { loadConfig } from './configuration';

const { db } = loadConfig();

export const dbConfig = {
  type: 'postgres',
  host: db.host,
  port: Number(db.port),
  username: db.username,
  password: db.password,
  database: db.database,
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
};
