import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './domain/users/user.module';
import { EventModule } from './domain/events/event.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { loadConfig } from '../configs/configuration';
import { dbConfig } from '../configs/database.config';
import { AuthModule } from './domain/auth/auth.module';

dotenv.config();

@Module({
  imports: [
    UserModule,
    EventModule,
    AuthModule,
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
