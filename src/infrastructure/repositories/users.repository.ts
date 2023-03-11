import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../domain/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
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
}
