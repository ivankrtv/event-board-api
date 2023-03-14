import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EventStatusEnum } from '../../../enums/event-status.enum';

export class EventsListDto {
  @ApiProperty()
  id: number;

  @ApiPropertyOptional()
  image: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ enum: EventStatusEnum })
  status: EventStatusEnum;

  @ApiProperty()
  eventPlace: string;

  @ApiProperty()
  peopleNeed: number;

  @ApiProperty()
  peopleJoined: number;

  @ApiProperty()
  startAt: Date;
}
