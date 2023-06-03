import { ApiProperty } from '@nestjs/swagger';

import { ImageTypesEnum } from '../../../enums/image-types.enum';

export class FileUploadImageDto {
  @ApiProperty({ enum: ImageTypesEnum })
  type: ImageTypesEnum;

  @ApiProperty({ description: 'id той сущности, которой пытаемся загрузить картинку' })
  entityId: string;
}
