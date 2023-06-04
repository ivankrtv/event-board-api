import { ApiPageNumberProperty } from '../../../../docs/api/common/properties/page-number-property.decorator';
import { PageNumberValidator } from '../../../infrastructure/validators/page-number.validator';

export class GetListingDto {
  @ApiPageNumberProperty()
  @PageNumberValidator()
  page: number;
}
