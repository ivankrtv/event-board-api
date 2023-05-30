import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';

import { ValidationFieldError } from '../../application/DTO/errors/validation-field-error';
import { ApiValidationErrorDto } from '../../application/DTO/errors/api-validation-error.dto';

export class ValidationException extends HttpException {
  constructor(errors: ValidationError[]) {
    const errorObjects: ValidationFieldError[] = errors.map((error) => {
      let errorsString = '';
      for (const key in error.constraints) {
        errorsString = errorsString + `${error.constraints[key]}, `;
      }
      errorsString = errorsString.slice(0, -2);

      return new ValidationFieldError(error.property, errorsString);
    });

    super(new ApiValidationErrorDto(errorObjects), HttpStatus.BAD_REQUEST);
  }
}
