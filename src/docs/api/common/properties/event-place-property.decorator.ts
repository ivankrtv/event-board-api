import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export function EventPlaceProperty() {
  return applyDecorators(
    ApiProperty({
      example: 'ул. Некрасова, д. 15',
      minLength: 1,
      maxLength: 100,
      title: 'event place',
      format: 'string',
      description: 'Место проведения',
      pattern: '^[A-Za-zА-Я-а-яЁё0-9 .,/-]{1,100}$',
    }),
  );
}
