import { Injectable } from '@nestjs/common';
import { CreateEventDto } from '../../application/DTO/events/create-event.dto';
import { EventEntity } from './event.entity';
import { EventStatusEnum } from '../../enums/event-status.enum';

@Injectable()
export class EventsBuilders {
  buildNewEventEntity(body: CreateEventDto): EventEntity {
    const event = new EventEntity();

    event.title = body.title;
    event.description = body.description;
    event.peopleNeed = body.peopleNeed;
    event.peopleJoined = 1;
    event.startAt = new Date(body.startAt);
    event.gender = body.gender;
    event.eventPlace = body.eventPlace;
    event.status = EventStatusEnum.active;

    return event;
  }
}
