import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { loadConfig } from "./configuration";
import {UserEntity} from "../src/domain/users/user.entity";
import {EventEntity} from "../src/domain/events/event.entity";
import {ParticipantsEntity} from "../src/domain/participants/participants.entity";

dotenv.config();
const { db } = loadConfig();

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: db.host,
  port: Number(db.port),
  username: db.username,
  password: db.password,
  database: db.database,
  entities: [UserEntity, EventEntity, ParticipantsEntity],
  migrations: ['src/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;