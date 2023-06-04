import { ApiValidationErrorDto } from '../../src/application/DTO/errors/api-validation-error.dto';
import { ApiNotFoundErrorDto } from '../../src/application/DTO/errors/api-not-found-error.dto';
import { ApiUserIsAlreadyParticipantErrorDto } from '../../src/application/DTO/errors/api-user-is-already-participant-error.dto';
import { ApiStartAtInThePastErrorDto } from '../../src/application/DTO/errors/api-start-at-in-the-past-error.dto';

export const extraModels = [
  ApiValidationErrorDto,
  ApiNotFoundErrorDto,
  ApiUserIsAlreadyParticipantErrorDto,
  ApiStartAtInThePastErrorDto,
];
