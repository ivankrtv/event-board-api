import { applyDecorators } from '@nestjs/common';
import { IsInt, IsNumber, IsPositive, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export function PeopleNeedValidator() {
  return applyDecorators(
    IsNumber(),
    Min(1),
    Max(999),
    IsInt(),
    IsPositive(),
    Type(() => Number),
  );
}
