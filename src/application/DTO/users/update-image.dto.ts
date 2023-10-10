import { IdProperty } from '../../../../docs/openapi/customPropertyDecorators/id.property';
import { JwtProperty } from '../../../../docs/openapi/customPropertyDecorators/jwt.property';

export class UpdateImageDto {
  @IdProperty()
  userId: string;

  @JwtProperty()
  token: string;
}
