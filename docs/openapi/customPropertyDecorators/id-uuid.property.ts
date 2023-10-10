import { applyDecorators } from '@nestjs/common';
import { StringProperty } from '@ivankrtv/openapidoc/dist';

export const idUuidProperty = () => {
  return applyDecorators(
    StringProperty({
      description: 'Id в формате `uuid`',
      example: '31c5880a-5df3-4bce-81ef-dae3f550913c',
      format: 'uuid',
      nullable: false,
    }),
  );
};
