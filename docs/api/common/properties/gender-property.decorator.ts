import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { GenderEnum } from '../../../../src/enums/gender.enum';

export function GenderProperty() {
  return applyDecorators(
    ApiProperty({
      enum: GenderEnum,
      description: 'Допустимый пол участника',
      format: 'enum',
    }),
  );
}
