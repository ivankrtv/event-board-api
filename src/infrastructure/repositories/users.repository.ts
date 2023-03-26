import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../../domain/users/user.entity';
import { AuthUserRepositoryInterface } from '../../domain/repositories-interfaces/auth.user-repository.interface';
import { UserUserRepositoryInterface } from '../../domain/repositories-interfaces/user.user-repository.interface';

@Injectable()
export class UsersRepository implements AuthUserRepositoryInterface, UserUserRepositoryInterface {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  async save(user: UserEntity): Promise<UserEntity> {
    return await this.repo.save(user);
  }

  async getByEmail(email: string): Promise<UserEntity | null> {
    return await this.repo.createQueryBuilder('users').where('users.email = :email', { email: email }).getOne();
  }

  async getOne(id: number): Promise<UserEntity> {
    return await this.repo.createQueryBuilder('users').where('users.id = :id', { id: id }).getOne();
  }
}
