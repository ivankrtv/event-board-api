import { ApiProperty } from '@nestjs/swagger';

import { ApiNameProperty } from '../../../../docs/api/common/properties/api-name-property.decorator';
import { UuidProperty } from '../../../../docs/api/common/properties/uuid-property.decorator';

export class GetProfileInfoResponseDto {
  @UuidProperty()
  readonly id: string;

  @ApiNameProperty()
  name: string;

  @ApiProperty({ nullable: true })
  image: string | null;

  constructor(id: string, name: string, image: string | null) {
    this.id = id;
    this.name = name;
    this.image = image ?? null;
  }
}
