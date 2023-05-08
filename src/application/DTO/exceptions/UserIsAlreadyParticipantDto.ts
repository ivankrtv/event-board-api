import { ApiProperty } from '@nestjs/swagger';

export class UserIsAlreadyParticipantDto {
  @ApiProperty({ example: 400 })
  statusCode: 400;

  @ApiProperty({ example: 'User is already participant' })
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  error: 'Bad Request';
}
