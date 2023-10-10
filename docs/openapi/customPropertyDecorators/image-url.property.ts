import { applyDecorators } from '@nestjs/common';
import { StringProperty } from '@ivankrtv/openapidoc/dist';

export const ImageUrlProperty = (params: { nullable?: boolean }) => {
  return applyDecorators(
    StringProperty({
      description: 'Url картинки',
      example: 'https://example.com/pic.jpeg',
      format: 'url',
      nullable: params.nullable ?? false,
    }),
  );
};
