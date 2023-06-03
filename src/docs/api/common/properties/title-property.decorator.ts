import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export function ApiTitleProperty(nonEmpty = true) {
  return applyDecorators(
    ApiProperty({
      example: 'Мафия на 12 человек',
      maxLength: 30,
      title: 'title',
      minItems: nonEmpty ? 1 : 0,
      format: 'string',
      description: 'Заголовок',
      pattern: `^[A-Za-zА-Я-а-яЁё0-9 .,]{${nonEmpty ? 1 : 0},30}$`,
    }),
  );
}
