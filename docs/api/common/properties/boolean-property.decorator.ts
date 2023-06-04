import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ApiPropertyOptions } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export function BooleanProperty(options?: ApiPropertyOptions) {
  return applyDecorators(ApiProperty({ example: true, ...options }));
}
