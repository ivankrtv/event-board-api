import { applyDecorators } from '@nestjs/common';
import { IntProperty } from '@ivankrtv/openapidoc/dist';

export const IdProperty = () => {
  return applyDecorators(IntProperty({ description: 'id', example: 1 }));
};
