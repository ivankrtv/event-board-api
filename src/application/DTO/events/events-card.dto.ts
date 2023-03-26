import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { EventStatusEnum } from '../../../enums/event-status.enum';
import { EventEntity } from '../../../domain/events/event.entity';

export class EventsCardDto {
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

  constructor(event: EventEntity) {
    this.id = event.id;
    this.image = event.image;
    this.title = event.title;
    this.status = event.status;
    this.eventPlace = event.eventPlace;
    this.peopleNeed = event.peopleNeed;
    this.peopleJoined = event.peopleJoined;
    this.startAt = event.startAt;
  }
}
