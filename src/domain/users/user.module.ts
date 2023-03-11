import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from '../../application/controllers/user.controller';
import { UsersRepository } from '../../infrastructure/repositories/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UsersRepository],
})
export class UserModule {}
