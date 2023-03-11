import {loadConfig} from "./configuration";
import {UserEntity} from "../src/domain/users/user.entity";
import {EventEntity} from "../src/domain/events/event.entity";
import {ParticipantsEntity} from "../src/domain/participants/participants.entity";

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