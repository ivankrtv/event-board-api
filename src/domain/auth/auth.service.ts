import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AuthUserRepositoryInterface } from '../repositories-interfaces/auth.user-repository.interface';
import { LoginDto } from '../../application/DTO/auth/login.dto';
import { TokensResponseDto } from '../../application/DTO/auth/tokens.response.dto';
import { HashWorkerInterface } from '../managers-interfaces/hash-worker.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AuthUserRepositoryInterface') private readonly userRepository: AuthUserRepositoryInterface,
    @Inject('HashWorkerInterface') private readonly hashWorker: HashWorkerInterface,
  ) {}

  async login(body: LoginDto): Promise<TokensResponseDto> {
    const user = await this.userRepository.getByEmail(body.email);
    if (!user) {
      throw new BadRequestException('User with this email doesnt exist');
    }

    const isPasswordCorrect = this.hashWorker.comparePasswords(body.password, user.password);
    if (!isPasswordCorrect) {
      throw new BadRequestException('Password incorrect');
    }

    return new TokensResponseDto('qwe', '30m');
  }
}
