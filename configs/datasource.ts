import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { loadConfig } from "./configuration";
import {UserEntity} from "../src/core/users/user.entity";
import {EventEntity} from "../src/core/events/event.entity";
import {ParticipantsEntity} from "../src/core/participants/participants.entity";

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