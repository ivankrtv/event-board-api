import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export function UuidProperty() {
  return applyDecorators(
    ApiProperty({
      description: 'ID в формате UUID',
      example: '47ecddba-b070-45b6-bcdf-bbc8eca98f21',
      format: 'uuid',
    }),
  );
}
