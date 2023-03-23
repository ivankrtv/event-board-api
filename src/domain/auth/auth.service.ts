import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthUserRepositoryInterface } from '../repositories-interfaces/auth.user-repository.interface';
import { LoginDto } from '../../application/DTO/auth/login.dto';
import { TokensResponseDto } from '../../application/DTO/auth/tokens.response.dto';
import { HashWorkerInterface } from '../managers-interfaces/hash-worker.interface';
import { JwtService } from '../../infrastructure/managers/jwt.service';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AuthUserRepositoryInterface') private readonly userRepository: AuthUserRepositoryInterface,
    @Inject('HashWorkerInterface') private readonly hashWorker: HashWorkerInterface,
    private readonly jwtService: JwtService,
  ) {}

  async login(body: LoginDto, userAgent: string, response: Response): Promise<TokensResponseDto> {
    const user = await this.userRepository.getByEmail(body.email);
    if (!user) {
      throw new BadRequestException('User with this email doesnt exist');
    }

    const isPasswordCorrect = this.hashWorker.comparePasswords(body.password, user.password);
    if (!isPasswordCorrect) {
      throw new BadRequestException('Password incorrect');
    }

    const accessToken = this.jwtService.signAccess({
      id: user.id,
      gender: user.gender,
      dormitory: user.dormitory,
    });

    const refreshToken = this.jwtService.signRefresh({ id: user.id, userAgent: userAgent });
    response.cookie('refresh', refreshToken.token, { httpOnly: true });

    return new TokensResponseDto(accessToken.token, accessToken.expiresIn);
  }

  async refresh(request: Request, userAgent: string, response: Response) {
    const currentRefresh = request.cookies['refresh'];

    const payload = this.jwtService.verifyRefresh(currentRefresh);
    if (payload.userAgent !== userAgent) {
      throw new UnauthorizedException('Token not fresh or incorrect');
    }

    const user = await this.userRepository.getOne(payload.id);
    if (!user) {
      throw new BadRequestException('User doesnt exist or banned');
    }

    const accessToken = this.jwtService.signAccess({
      id: user.id,
      gender: user.gender,
      dormitory: user.dormitory,
    });

    const refreshToken = this.jwtService.signRefresh({ id: user.id, userAgent: userAgent });
    response.cookie('refresh', refreshToken.token, { httpOnly: true });

    return new TokensResponseDto(accessToken.token, accessToken.expiresIn);
  }
}
