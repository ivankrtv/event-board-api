import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { EventCategory } from '../../../../enums/event-category';

export function EventCategoryProperty() {
  return applyDecorators(
    ApiProperty({
      enum: EventCategory,
      description: 'Категория активности события',
      format: 'enum',
    }),
  );
}
