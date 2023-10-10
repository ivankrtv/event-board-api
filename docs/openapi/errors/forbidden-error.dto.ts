import { IntProperty, StringProperty } from '@ivankrtv/openapidoc/dist';

export class ForbiddenErrorDto {
  @IntProperty({ description: 'Статус-код ошибки', example: 403 })
  statusCode: number;

  @StringProperty({ description: 'Сообщение ошибки', example: 'Forbidden resource' })
  message: string;

  @StringProperty({ description: 'Forbidden', example: 'Forbidden' })
  error: string;
}
