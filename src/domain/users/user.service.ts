import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';

import { UserRegistrationDto } from '../../application/DTO/users/user-registration.dto';
import { UsersBuilders } from './users.builders';
import { HashWorkerInterface } from '../managers-interfaces/hash-worker.interface';
import { UserUserRepositoryInterface } from '../repositories-interfaces/user.user-repository.interface';
import { UpdateImageDto } from '../../application/DTO/users/update-image.dto';
import { ImageUploadManager } from '../../infrastructure/managers/image-upload.manager';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserUserRepositoryInterface') private readonly usersRepository: UserUserRepositoryInterface,
    @Inject('HashWorkerInterface') private readonly hashWorker: HashWorkerInterface,
    private readonly userBuilders: UsersBuilders,
    private readonly imageUploadManager: ImageUploadManager,
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

  async uploadAvatar(body: UpdateImageDto): Promise<void> {
    const fileInfo = this.imageUploadManager.decode(body.token);
    const user = await this.usersRepository.getOne(body.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.image = fileInfo;
    await this.usersRepository.save(user);
  }
}
