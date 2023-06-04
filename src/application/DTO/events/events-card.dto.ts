import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { EventStatusEnum } from '../../../enums/event-status.enum';
import { EventEntity } from '../../../domain/events/event.entity';
import { ParticipantRoleEnum } from '../../../enums/participant-role.enum';
import { ApiTitleProperty } from '../../../../docs/api/common/properties/title-property.decorator';
import { EventPlaceProperty } from '../../../../docs/api/common/properties/event-place-property.decorator';
import { PeopleNeedProperty } from '../../../../docs/api/common/properties/people-need-property.decorator';
import { ApiDateTimeProperty } from '../../../../docs/api/common/properties/datetime-property.decorator';
import { PeopleJoinedProperty } from '../../../../docs/api/common/properties/people-joined-property.decorator';
import { BooleanProperty } from '../../../../docs/api/common/properties/boolean-property.decorator';
import { UuidProperty } from '../../../../docs/api/common/properties/uuid-property.decorator';

export class EventsCardDto {
  @UuidProperty()
  id: string;

  @ApiPropertyOptional({ nullable: true })
  image: string;

  @ApiTitleProperty()
  title: string;

  @ApiProperty({ enum: EventStatusEnum })
  status: EventStatusEnum;

  @EventPlaceProperty()
  eventPlace: string;

  @PeopleNeedProperty()
  peopleNeed: number;

  @PeopleJoinedProperty()
  peopleJoined: number;

  @ApiProperty()
  startAt: Date;

  @BooleanProperty({ description: 'Является ли пользователь участником' })
  isParticipant: boolean;

  @BooleanProperty({ description: 'Является ли пользователь организатором' })
  isOrganizer: boolean;

  public static createByEventEntityAndUserId(event: EventEntity, userId: string): EventsCardDto {
    const eventCard = new EventsCardDto(event);
    const participant = event.participants.find(
      (participantUser) => participantUser.role === ParticipantRoleEnum.joiner,
    );
    const organizer = event.participants.find(
      (participantUser) => participantUser.role === ParticipantRoleEnum.organizer,
    );

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
