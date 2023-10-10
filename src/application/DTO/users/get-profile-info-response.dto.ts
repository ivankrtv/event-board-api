import { StringProperty } from '@ivankrtv/openapidoc/dist';

import { idUuidProperty } from '../../../../docs/openapi/customPropertyDecorators/id-uuid.property';
import { ImageUrlProperty } from '../../../../docs/openapi/customPropertyDecorators/image-url.property';

export class GetProfileInfoResponseDto {
  @idUuidProperty()
  readonly id: string;

  @StringProperty({ description: 'Имя пользователя', example: 'Иван' })
  name: string;

  @ImageUrlProperty({ nullable: true })
  image: string | null;

  constructor(id: string, name: string, image: string | null) {
    this.id = id;
    this.name = name;
    this.image = image ?? null;
  }
}
