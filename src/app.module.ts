import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from "./core/users/user.module";
import { EventModule } from "./core/events/event.module";
import {TypeOrmModule, TypeOrmModuleOptions} from "@nestjs/typeorm";
import { UserEntity } from "./core/users/user.entity";
import { EventEntity } from "./core/events/event.entity";
import { ParticipantsEntity } from "./core/participants/participants.entity";
import { loadConfig } from "../configs/configuration";
import {dbConfig} from "../configs/database.config";

dotenv.config();

@Module({
  imports: [
    UserModule,
    EventModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [loadConfig],
    }),
    TypeOrmModule.forRoot(dbConfig as TypeOrmModuleOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
