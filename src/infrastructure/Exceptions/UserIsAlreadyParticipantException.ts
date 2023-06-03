import { HttpException, HttpStatus } from '@nestjs/common';

import { ApiUserIsAlreadyParticipantErrorDto } from '../../application/DTO/errors/api-user-is-already-participant-error.dto';

export class UserIsAlreadyParticipantException extends HttpException {
  constructor() {
    super(new ApiUserIsAlreadyParticipantErrorDto(), HttpStatus.BAD_REQUEST);
  }
}
