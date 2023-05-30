import { applyDecorators } from '@nestjs/common';
import { IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';

import { GenderEnum } from '../../enums/gender.enum';

export function GenderValidator() {
  return applyDecorators(
    IsEnum(GenderEnum),
    Transform(({ value }) => GenderEnum[value]),
  );
}
