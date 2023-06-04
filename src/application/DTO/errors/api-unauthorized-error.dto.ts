import { ApiProperty } from '@nestjs/swagger';

export class ApiNotFoundErrorDto {
  @ApiProperty({ enum: [401] })
  statusCode: 401;

  @ApiProperty({ example: 'Unauthorized request' })
  message: string;

  @ApiProperty({ enum: ['Unauthorized'] })
  error: 'Unauthorized';
}
