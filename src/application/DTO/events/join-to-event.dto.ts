import { ApiProperty } from '@nestjs/swagger';

export class JoinToEventDto {
  @ApiProperty({ example: 1 })
  eventId: string;
}
