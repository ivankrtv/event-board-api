import { HttpException, HttpStatus } from '@nestjs/common';

import { ApiStartAtInThePastErrorDto } from '../../application/DTO/errors/api-start-at-in-the-past-error.dto';

export class StartAtInThePastException extends HttpException {
  constructor() {
    super(new ApiStartAtInThePastErrorDto(), HttpStatus.BAD_REQUEST);
  }
}
