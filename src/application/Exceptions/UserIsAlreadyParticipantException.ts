import { BadRequestException } from '@nestjs/common';

export class UserIsAlreadyParticipantException extends BadRequestException {
  constructor() {
    super('User is already participant');
  }
}
