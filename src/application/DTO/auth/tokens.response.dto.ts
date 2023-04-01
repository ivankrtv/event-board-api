import { ApiProperty } from '@nestjs/swagger';

export class TokensResponseDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  expiresIn: number;

  constructor(accessToken: string, expiresIn: number) {
    this.token = accessToken;
    this.expiresIn = expiresIn;
  }
}
