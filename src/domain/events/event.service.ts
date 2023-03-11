import { BadRequestException, Injectable } from '@nestjs/common';
import { EventsRepository } from '../../infrastructure/repositories/events.repository';
import { CreateEventDto } from '../../application/DTO/events/create-event.dto';
import { NewIdResponseDto } from '../../application/DTO/new-id-response.dto';
import { EventsBuilders } from './events.builders';

@Injectable()
export class EventService {
  constructor(private readonly eventsRepository: EventsRepository, private readonly eventsBuilders: EventsBuilders) {}

  async createEvent(body: CreateEventDto): Promise<NewIdResponseDto> {
    if (new Date(body.startAt) < new Date()) {
      throw new BadRequestException('Event start time in the past');
    }

    const newEvent = this.eventsBuilders.buildNewEventEntity(body);
    const { id } = await this.eventsRepository.save(newEvent);
    return { id: id };
  }

  getEventsList() {
    return {
      events: [],
      page: 0,
    };
  }
}
