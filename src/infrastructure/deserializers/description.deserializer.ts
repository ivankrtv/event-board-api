import {
  IsString,
  MaxLength,
  MinLength,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { applyDecorators } from '@nestjs/common';

export function DescriptionDeserialize() {
  return applyDecorators(IsString(), MaxLength(500), MinLength(1));
}
