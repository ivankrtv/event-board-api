import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from '../../infrastructure/repositories/users.repository';
import { UserRegistrationDto } from '../../application/DTO/users/user-registration.dto';
import { UsersBuilders } from './users.builders';
import { HashWorkerInterface } from '../managers-interfaces/hash-worker.interface';

@Injectable()
export class UserService {
  constructor(
    private readonly usersRepository: UsersRepository,
    @Inject('HashWorkerInterface') private readonly hashWorker: HashWorkerInterface,
    private readonly userBuilders: UsersBuilders,
  ) {}

  async registration(body: UserRegistrationDto): Promise<void> {
    if (body.password !== body.confirmPassword) {
      throw new BadRequestException('Passwords is not some');
    }

    const existUser = await this.usersRepository.getByEmail(body.email);
    if (existUser) {
      throw new BadRequestException('User with this email is already exist');
    }

    const password = this.hashWorker.getHash(body.password);
    const newUser = this.userBuilders.buildUserEntity(body, password);

    await this.usersRepository.save(newUser);
  }
}
