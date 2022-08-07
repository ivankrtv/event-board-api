import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from "./users/user.module";
import { EventModule } from "./events/event.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./users/user.entity";
import { EventEntity } from "./events/event.entity";
import { ParticipantsEntity } from "./participants/participants.entity";

dotenv.config();

@Module({
  imports: [
    UserModule,
    EventModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOSTNAME,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [UserEntity, EventEntity, ParticipantsEntity],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
