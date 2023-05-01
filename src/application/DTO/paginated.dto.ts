import { ApiProperty } from '@nestjs/swagger';

export class PaginatedDto<DTO> {
  data: DTO[];

  @ApiProperty()
  totalCount: number;

  constructor(models: DTO[], count: number) {
    this.data = models;
    this.totalCount = count;
  }
}
