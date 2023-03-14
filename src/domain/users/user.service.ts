import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../../infrastructure/repositories/users.repository';
import { UserRegistrationDto } from '../../application/DTO/users/user-registration.dto';
import { HashWorker } from '../../infrastructure/hash-workers/hash-worker';
import { UsersBuilders } from './users.builders';

@Injectable()
export class UserService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashWorker: HashWorker,
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

    const password = await this.hashWorker.getHash(body.password);
    const newUser = this.userBuilders.buildUserEntity(body, password);

    await this.usersRepository.save(newUser);
  }
}
