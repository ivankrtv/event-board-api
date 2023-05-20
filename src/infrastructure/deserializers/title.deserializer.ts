import { applyDecorators } from '@nestjs/common';
import { IsString, MaxLength } from 'class-validator';

export function TitleDeserialize() {
  return applyDecorators(IsString(), MaxLength(50));
}
