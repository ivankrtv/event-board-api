import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { EventMood } from '../../../../src/enums/event-mood';

export function EventMoodProperty() {
  return applyDecorators(
    ApiProperty({
      enum: EventMood,
      description: 'Категория настроения события',
      format: 'enum',
    }),
  );
}
