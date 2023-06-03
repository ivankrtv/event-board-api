import { ApiProperty } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export function ApiPageNumberProperty() {
  return applyDecorators(
    ApiProperty({
      title: 'page number',
      description: 'Номер страницы',
      format: 'integer',
      example: 1,
      minimum: 0,
    }),
  );
}
