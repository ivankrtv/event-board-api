import { ArrayProperty, IntProperty, StringProperty } from '@ivankrtv/openapidoc/dist';

export class ValidationErrorDto {
  @IntProperty({ description: 'Статус-код ошибки', example: 400 })
  statusCode: number;

  @ArrayProperty({ description: 'Массив с описаниями ошибок', items: 'string' })
  message: string[];

  @StringProperty({ description: 'Bad Request', example: 'Bad Request' })
  error: string;
}
