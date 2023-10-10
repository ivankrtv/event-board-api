import { IntProperty, StringProperty } from '@ivankrtv/openapidoc/dist';

export class DomainErrorDto {
  @IntProperty({ description: 'Статус-код ошибки', example: 400 })
  statusCode: number;

  @StringProperty({ description: 'Текст ошибки', example: 'Incorrect page number. Expected: > 0' })
  message: string;

  @StringProperty({ description: 'Тип ошибки в виде текстового "кода ошибки"', example: 'domain_exception' })
  type: string;

  @StringProperty({ description: '', example: 'Bad request' })
  error: string;
}
