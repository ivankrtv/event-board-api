import { ApiProperty } from '@nestjs/swagger';

export class ValidationFieldError {
  @ApiProperty({ description: 'Название поля с ошибкой' })
  field: string;

  @ApiProperty({ description: 'Текст ошибки' })
  error: string;

  constructor(field: string, errorText: string) {
    this.field = field;
    this.error = errorText;
  }
}
