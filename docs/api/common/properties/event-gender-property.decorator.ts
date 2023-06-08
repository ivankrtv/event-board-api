import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { EventsGenderEnum } from '../../../../src/enums/events-gender.enum';

export function EventGenderProperty() {
  return applyDecorators(
    ApiProperty({
      enum: EventsGenderEnum,
      description: 'Допустимый пол участника',
      format: 'enum',
    }),
  );
}
