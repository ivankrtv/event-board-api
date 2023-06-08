import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserController } from '../../application/controllers/user.controller';
import { UsersRepository } from '../../infrastructure/repositories/users.repository';
import { UserEntity } from './user.entity';
import { HashWorker } from '../../infrastructure/hash-workers/hash-worker';
import { UsersBuilders } from './users.builders';
import { UserUserRepositoryInterface } from '../repositories-interfaces/user.user-repository.interface';
import { ImageUploadManager } from '../../infrastructure/managers/image-upload.manager';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    UserService,
    { provide: 'UserUserRepositoryInterface', useClass: UsersRepository },
    { provide: 'HashWorkerInterface', useClass: HashWorker },
    UsersBuilders,
    ImageUploadManager,
  ],
})
export class UserModule {}
