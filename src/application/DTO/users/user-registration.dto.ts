import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GenderEnum } from '../../../enums/gender.enum';

export class UserRegistrationDto {
  @ApiProperty({ example: 'Ivanov Ivan' })
  name: string;

  @ApiProperty({ example: 'krotov.ia@mail.ru' })
  email: string;

  @ApiProperty({ example: '12345678Aa' })
  password: string;

  @ApiProperty({ example: '12345678Aa' })
  confirmPassword: string;

  @ApiProperty({ enum: GenderEnum })
  gender: GenderEnum;

  @ApiProperty({ example: '3531201/80201' })
  group: string;

  @ApiPropertyOptional({ example: '14a' })
  dormitory: string | null;
}
