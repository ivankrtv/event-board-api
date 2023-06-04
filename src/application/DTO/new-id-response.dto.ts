import { UuidProperty } from '../../../docs/api/common/properties/uuid-property.decorator';

export class NewIdResponseDto {
  @UuidProperty()
  id: string;
}
