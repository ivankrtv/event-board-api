import { ApiProperty } from '@nestjs/swagger';

export class PaginatedDto<DTO> {
  data: DTO[];

  @ApiProperty()
  totalCount: number;
}
