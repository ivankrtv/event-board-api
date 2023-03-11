import { Injectable } from '@nestjs/common';
import { EventsRepository } from '../../infrastructure/repositories/events.repository';

@Injectable()
export class EventService {
  constructor(private readonly eventsRepository: EventsRepository) {}

  getEventsList() {
    return {
      events: [],
      page: 0,
    };
  }
}
