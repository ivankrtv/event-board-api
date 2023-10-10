import { IntProperty, StringProperty } from '@ivankrtv/openapidoc/dist';

export class NotFoundErrorDto {
  @IntProperty({ description: 'Статус код ошибки: 404', example: 404 })
  statusCode: number;

  @StringProperty({ description: 'Текст ошибки', example: 'User not found' })
  message: string;

  @StringProperty({ description: 'Текстовый код ошибки. Всегда "Not Found"', example: 'Not Found' })
  error: string;
}
