import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export function ApiNameProperty() {
  return applyDecorators(
    ApiProperty({
      example: 'krotov.ia',
      maxLength: 50,
      minLength: 1,
      title: 'name',
      minItems: 1,
      format: 'string',
      description: 'Имя',
      pattern: `^[A-Za-zА-Я-а-яЁё0-9 .-]{1,50}$`,
    }),
  );
}
