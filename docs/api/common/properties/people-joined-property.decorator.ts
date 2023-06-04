import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export function PeopleJoinedProperty() {
  return applyDecorators(
    ApiProperty({
      title: 'people joined',
      description: 'Количество людей, присоединившихся к событию',
      format: 'integer',
      example: 10,
      minimum: 1,
      maximum: 999,
    }),
  );
}
