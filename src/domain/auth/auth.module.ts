import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { UsersRepository } from '../../infrastructure/repositories/users.repository';
import { UserEntity } from '../users/user.entity';
import { AuthController } from '../../application/controllers/auth.controller';
import { HashWorker } from '../../infrastructure/hash-workers/hash-worker';
import { JwtService } from '../../infrastructure/managers/jwt.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [
    AuthService,
    { provide: 'AuthUserRepositoryInterface', useClass: UsersRepository },
    { provide: 'HashWorkerInterface', useClass: HashWorker },
  ],
})
export class AuthModule {}
