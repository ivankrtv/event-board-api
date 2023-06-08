import { ApiProperty } from '@nestjs/swagger';

export class ApiNotFoundErrorDto {
  @ApiProperty({ enum: [404] })
  statusCode: 404;

  @ApiProperty({ example: 'Event with id: 1 not found' })
  message: string;

  @ApiProperty({ enum: ['Not Found'] })
  error: 'Not Found';
}
