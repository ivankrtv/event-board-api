import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

@ApiExtraModels()
export class ApiUserIsAlreadyParticipantErrorDto {
  @ApiProperty({ enum: [400] })
  statusCode: 400;

  @ApiProperty({ default: 'User is already participant' })
  message: string;

  @ApiProperty({ enum: ['user_is_already_participant'] })
  type: string;

  @ApiProperty({ enum: ['Bad Request'] })
  error: 'Bad Request';

  constructor() {
    this.statusCode = 400;
    this.message = 'User is already participant';
    this.type = 'user_is_already_participant';
    this.error = 'Bad Request';
  }
}
