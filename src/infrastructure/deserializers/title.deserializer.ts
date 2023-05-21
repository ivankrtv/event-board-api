import { applyDecorators } from '@nestjs/common';
import { IsString, MaxLength, MinLength } from 'class-validator';

export function TitleDeserialize(property?: { nonEmpty: boolean }) {
  const isNonEmpty = property?.nonEmpty ?? true;
  const decoratorsArray = [IsString(), MaxLength(30)];
  if (isNonEmpty) {
    decoratorsArray.push(MinLength(1, { message: 'expected no empty string' }));
  }
  return applyDecorators(...decoratorsArray);
}
