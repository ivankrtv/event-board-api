import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWTConf } from '../../../configs/configuration';
import * as jwt from 'jsonwebtoken';

export type SignToken = {
  token: string;
  expiresIn: number;
};

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {
    this.configs = configService.get<JWTConf>('JWT');
  }

  private configs: JWTConf;

  signAccess(payload: string | object): SignToken {
    const token = jwt.sign(payload, this.configs.accessSecret, { expiresIn: this.configs.accessExpiresIn });
    return {
      token: token,
      expiresIn: this.configs.accessExpiresIn,
    };
  }

  signRefresh(payload: string | object): SignToken {
    const token = jwt.sign(payload, this.configs.refreshSecret, { expiresIn: this.configs.refreshExpiresIn });
    return {
      token: token,
      expiresIn: this.configs.refreshExpiresIn,
    };
  }

  verifyAccess(token: string): string | jwt.JwtPayload {
    try {
      return jwt.verify(token, this.configs.accessSecret);
    } catch (exception) {
      throw new UnauthorizedException('Token not fresh or incorrect');
    }
  }

  verifyRefresh(token: string): string | jwt.JwtPayload {
    try {
      return jwt.verify(token, this.configs.refreshSecret);
    } catch (exception) {
      throw new UnauthorizedException('Token not fresh or incorrect');
    }
  }
}
