import { ApiProperty } from '@nestjs/swagger';

export class NewIdResponseDto {
  @ApiProperty()
  id: number;
}
