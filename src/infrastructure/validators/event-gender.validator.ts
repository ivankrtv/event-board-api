import { applyDecorators } from '@nestjs/common';
import { IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';

import { EventsGenderEnum } from '../../enums/events-gender.enum';

export function EventGenderValidator() {
  return applyDecorators(
    IsEnum(EventsGenderEnum),
    Transform(({ value }) => EventsGenderEnum[value]),
  );
}
