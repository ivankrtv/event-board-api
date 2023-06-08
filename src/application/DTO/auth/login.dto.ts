import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user@mail.ru' })
  email: string;

  @ApiProperty()
  password: string;
}
