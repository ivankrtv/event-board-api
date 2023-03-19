import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from '../../application/controllers/user.controller';
import { UsersRepository } from '../../infrastructure/repositories/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { HashWorker } from '../../infrastructure/hash-workers/hash-worker';
import { UsersBuilders } from './users.builders';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UsersRepository, { provide: 'HashWorkerInterface', useClass: HashWorker }, UsersBuilders],
})
export class UserModule {}
