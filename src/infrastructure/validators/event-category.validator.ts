import { applyDecorators } from '@nestjs/common';
import { IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';

import { EventCategory } from '../../enums/event-category';

export function EventCategoryValidator() {
  return applyDecorators(
    IsEnum(EventCategory),
    Transform(({ value }) => EventCategory[value]),
  );
}
