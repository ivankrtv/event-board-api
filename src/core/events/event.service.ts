import { Injectable } from '@nestjs/common';
import {EventsRepository} from "../../database/events.repository";

@Injectable()
export class EventService {
  constructor(
    private readonly eventsRepository: EventsRepository
  ) {}

  getEventsList() {
    return {
      events: [],
      page: 0
    };
  }
}
