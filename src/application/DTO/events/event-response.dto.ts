import { ApiProperty } from '@nestjs/swagger';

import { UuidProperty } from '../../../../docs/api/common/properties/uuid-property.decorator';
import { ApiTitleProperty } from '../../../../docs/api/common/properties/title-property.decorator';
import { ApiDateTimeProperty } from '../../../../docs/api/common/properties/datetime-property.decorator';
import { EventPlaceProperty } from '../../../../docs/api/common/properties/event-place-property.decorator';
import { EventCategoryProperty } from '../../../../docs/api/common/properties/event-category-property.decorator';
import { EventMoodProperty } from '../../../../docs/api/common/properties/event-mood-property.decorator';
import { EventMood } from '../../../enums/event-mood';
import { EventCategory } from '../../../enums/event-category';
import { ApiDescriptionProperty } from '../../../../docs/api/common/properties/description-propery.decorator';
import { GetProfileInfoResponseDto } from '../users/get-profile-info-response.dto';
import { EventEntity } from '../../../domain/events/event.entity';
import { EventsGenderEnum } from '../../../enums/events-gender.enum';
import { EventGenderProperty } from '../../../../docs/api/common/properties/event-gender-property.decorator';
import { ParticipantRoleEnum } from '../../../enums/participant-role.enum';

export class EventResponseDto {
  @UuidProperty()
  id: string;

  @ApiTitleProperty()
  title: string;

  @ApiDescriptionProperty()
  description: string;

  @ApiProperty()
  startAt: Date;

  @EventPlaceProperty()
  eventPlace: string;

  @EventCategoryProperty()
  category: EventCategory;

  @EventMoodProperty()
  mood: EventMood;

  @EventGenderProperty()
  gender: EventsGenderEnum;

  @ApiProperty()
  organizer: GetProfileInfoResponseDto;

  constructor(event: EventEntity) {
    const organizer = event.participants.find((participant) => participant.role === ParticipantRoleEnum.organizer);

    this.id = event.id;
    this.title = event.title;
    this.description = event.description;
    this.startAt = event.startAt;
    this.eventPlace = event.eventPlace;
    this.category = event.category;
    this.mood = event.mood;
    this.gender = event.gender;
    this.organizer = {
      id: organizer.id,
      name: organizer.user.name,
      image: organizer.user.image?.url,
    };
  }
}
