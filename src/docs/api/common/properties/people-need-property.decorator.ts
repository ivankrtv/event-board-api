import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export function PeopleNeedProperty() {
  return applyDecorators(
    ApiProperty({
      title: 'people need',
      description: 'Количество людей, которые могут присоединиться',
      format: 'integer',
      example: 10,
      minimum: 1,
      maximum: 999,
    }),
  );
}
