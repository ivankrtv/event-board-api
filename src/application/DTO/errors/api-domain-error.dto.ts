import { ApiProperty } from '@nestjs/swagger';

export class ApiDomainErrorDto {
  @ApiProperty({ enum: [400] })
  statusCode: 400;

  @ApiProperty({ enum: ['Domain Error'] })
  error: string;

  constructor() {
    this.statusCode = 400;
    this.error = 'Domain Error';
  }
}
