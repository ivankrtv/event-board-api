import { ApiProperty } from '@nestjs/swagger';

import { ApiDomainErrorDto } from './api-domain-error.dto';

export class ApiStartAtInThePastErrorDto extends ApiDomainErrorDto {
  @ApiProperty({ enum: ['start_at_in_the_past'] })
  type = 'start_at_in_the_past';

  @ApiProperty({ example: 'Start At datetime in the past. expected in future' })
  message = 'Start At datetime in the past. expected in future';
}
