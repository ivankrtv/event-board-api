import { ApiValidationErrorDto } from '../../application/DTO/errors/api-validation-error.dto';
import { ApiNotFoundErrorDto } from '../../application/DTO/errors/api-not-found-error.dto';
import { ApiUserIsAlreadyParticipantErrorDto } from '../../application/DTO/errors/api-user-is-already-participant-error.dto';
import { ApiStartAtInThePastErrorDto } from '../../application/DTO/errors/api-start-at-in-the-past-error.dto';

export const extraModels = [
  ApiValidationErrorDto,
  ApiNotFoundErrorDto,
  ApiUserIsAlreadyParticipantErrorDto,
  ApiStartAtInThePastErrorDto,
];
