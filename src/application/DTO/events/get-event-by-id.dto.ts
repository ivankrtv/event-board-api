import { UuidProperty } from '../../../../docs/api/common/properties/uuid-property.decorator';

export class GetEventByIdDto {
  @UuidProperty()
  id: string;
}
