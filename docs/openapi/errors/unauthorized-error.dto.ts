import { IntProperty, StringProperty } from '@ivankrtv/openapidoc/dist';

export class UnauthorizedErrorDto {
  @IntProperty({ description: 'Статус-код', example: 401 })
  statusCode: number;

  @StringProperty({ description: 'Текст ошибки', example: 'Unauthorized' })
  message: string;
}
