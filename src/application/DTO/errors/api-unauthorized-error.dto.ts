import { ApiProperty } from '@nestjs/swagger';

export class ApiUnauthorizedErrorDto {
  @ApiProperty({ enum: [401] })
  statusCode: 401;

  @ApiProperty({ example: 'Unauthorized request' })
  message: string;

  @ApiProperty({ enum: ['Unauthorized'] })
  error: 'Unauthorized';
}
