import { applyDecorators } from '@nestjs/common';
import { IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';

import { EventMood } from '../../enums/event-mood';

export function EventMoodValidator() {
  return applyDecorators(
    IsEnum(EventMood),
    Transform(({ value }) => EventMood[value]),
  );
}
