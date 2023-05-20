import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class ValidationException extends HttpException {
  constructor(errors: ValidationError[]) {
    const errorObjects = errors.map((error) => {
      let errorsString = '';
      for (const key in error.constraints) {
        errorsString = errorsString + `${error.constraints[key]}, `;
      }
      errorsString = errorsString.slice(0, -2);

      return {
        field: error.property,
        errors: errorsString,
      };
    });

    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: errorObjects,
        error: 'Validation error',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
