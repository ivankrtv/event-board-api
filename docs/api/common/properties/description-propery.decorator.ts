import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export function ApiDescriptionProperty(nonEmpty = true) {
  return applyDecorators(
    ApiProperty({
      example:
        'Будем играть в около-спортивную мафию, 12 человек, в закрытую, карточки есть. Приходите немного' +
        ' раньше, чтобы познакомиться)',
      maxLength: 500,
      title: 'description',
      minItems: nonEmpty ? 1 : 0,
      format: 'text',
      description: 'Описание',
    }),
  );
}
