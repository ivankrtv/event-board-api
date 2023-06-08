import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export function ApiDateTimeProperty(property?: { description: string }) {
  return applyDecorators(
    ApiProperty({
      example: '2023-11-20T18:00:00',
      type: 'string',
      title: 'Дата со временем',
      format: 'datetime',
      pattern: 'YYYY-MM-DDTHH:mm:ss',
      description: property?.description,
    }),
  );
}
