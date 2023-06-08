import { applyDecorators } from '@nestjs/common';
import { IsInt, IsNumber, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';

export function PageNumberValidator() {
  return applyDecorators(
    IsNumber(),
    Min(0),
    IsInt(),
    IsPositive(),
    Type(() => Number),
  );
}
