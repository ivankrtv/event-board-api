import {loadConfig} from "./configuration";
import {UserEntity} from "../src/core/users/user.entity";
import {EventEntity} from "../src/core/events/event.entity";
import {ParticipantsEntity} from "../src/core/participants/participants.entity";

const { db } = loadConfig();

export const dbConfig = {
  type: 'postgres',
  host: db.host,
  port: Number(db.port),
  username: db.username,
  password: db.password,
  database: db.database,
  entities: [UserEntity, EventEntity, ParticipantsEntity],
  synchronize: false,
}