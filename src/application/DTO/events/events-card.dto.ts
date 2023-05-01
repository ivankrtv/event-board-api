import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { EventStatusEnum } from '../../../enums/event-status.enum';
import { EventEntity } from '../../../domain/events/event.entity';
import { ParticipantRoleEnum } from '../../../enums/participant-role.enum';

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

  @ApiProperty()
  isParticipant: boolean;

  @ApiProperty()
  isOrganizer: boolean;

  public static createByEventEntityAndUserId(event: EventEntity, userId: number): EventsCardDto {
    const eventCard = new EventsCardDto(event);
    const participant = event.users.find((participantUser) => participantUser.role === ParticipantRoleEnum.joiner);
    const organizer = event.users.find((participantUser) => participantUser.role === ParticipantRoleEnum.organizer);

    if (participant?.user.id === userId) {
      eventCard.isParticipant = true;
    }
    if (organizer?.user.id === userId) {
      eventCard.isOrganizer = true;
      eventCard.isParticipant = true;
    }

    return eventCard;
  }

  constructor(event: EventEntity) {
    this.id = event.id;
    this.image = event.image;
    this.title = event.title;
    this.status = event.status;
    this.eventPlace = event.eventPlace;
    this.peopleNeed = event.peopleNeed;
    this.peopleJoined = event.peopleJoined;
    this.startAt = event.startAt;
    this.isParticipant = false;
    this.isOrganizer = false;
  }
}
