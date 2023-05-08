import { ApiProperty } from '@nestjs/swagger';

export class NotFoundExceptionDto {
  @ApiProperty({ example: 404 })
  statusCode: 404;

  @ApiProperty({ example: 'Event with id: 1 not found' })
  message: string;

  @ApiProperty({ example: 'Not Found' })
  error: 'Not Found';
}
