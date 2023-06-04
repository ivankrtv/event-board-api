import { applyDecorators, Type } from '@nestjs/common';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { ApiBadRequestResponse, getSchemaPath } from '@nestjs/swagger';

import { ApiValidationErrorDto } from '../../src/application/DTO/errors/api-validation-error.dto';

const defaultBadRequestResponses = [ApiValidationErrorDto];

export function ApiBadRequest<T extends Type<unknown>>(...models: T[]) {
  const requests = [...defaultBadRequestResponses, ...models];

  const schemas: SchemaObject[] = requests.map((requestDto) => {
    return {
      $ref: getSchemaPath(requestDto),
    } as SchemaObject;
  });

  return applyDecorators(
    ApiBadRequestResponse({
      schema: {
        oneOf: schemas,
      },
    }),
  );
}
