import { ApiProperty } from '@nestjs/swagger';

export class TokensResponseDto {
  accessToken: string;
  expiresIn: string;

  constructor(accessToken: string, expiresIn: string) {
    this.accessToken = accessToken;
    this.expiresIn = expiresIn;
  }
}
