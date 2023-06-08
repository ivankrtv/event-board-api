import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

import { ValidationFieldError } from './validation-field-error';

@ApiExtraModels()
export class ApiValidationErrorDto {
  @ApiProperty({ default: 400 })
  statusCode: number;

  @ApiProperty({ default: 'Validation error' })
  error: string;

  @ApiProperty({ enum: ['validation_error'] })
  type: string;

  @ApiProperty({ type: [ValidationFieldError] })
  message: ValidationFieldError[];

  constructor(errors: ValidationFieldError[]) {
    this.statusCode = 400;
    this.error = 'Validation error';
    this.type = 'validation_error';
    this.message = errors;
  }
}
