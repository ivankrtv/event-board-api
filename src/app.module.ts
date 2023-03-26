import * as dotenv from 'dotenv';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './domain/users/user.module';
import { EventModule } from './domain/events/event.module';
import { loadConfig } from '../configs/configuration';
import { dbConfig } from '../configs/database.config';
import { AuthModule } from './domain/auth/auth.module';
import { JwtService } from './infrastructure/managers/jwt.service';
import { GlobalModule } from './global.module';

dotenv.config();

@Module({
  imports: [
    UserModule,
    EventModule,
    AuthModule,
    GlobalModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [loadConfig],
    }),
    TypeOrmModule.forRoot(dbConfig as TypeOrmModuleOptions),
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
  exports: [JwtService],
})
export class AppModule {}
