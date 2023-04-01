import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

import { PaginatedDto } from '../DTO/paginated.dto';

export function ApiPaginatedResponse<Model extends Type<unknown>>(model: Model) {
  return applyDecorators(
    ApiExtraModels(PaginatedDto, model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
              totalCount: {
                type: 'number',
              },
            },
          },
        ],
      },
    }),
  );
}
