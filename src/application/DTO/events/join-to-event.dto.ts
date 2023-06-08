import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class JoinToEventDto {
  @ApiProperty({ example: 1 })
  @IsUUID()
  eventId: string;
}
