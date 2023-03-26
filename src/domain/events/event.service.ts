import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import type { QueueManagerInterface } from '../managers-interfaces/queue-manager.interface';

import { EventsRepository } from '../../infrastructure/repositories/events.repository';
import { CreateEventDto } from '../../application/DTO/events/create-event.dto';
import { NewIdResponseDto } from '../../application/DTO/new-id-response.dto';
import { EventsBuilders } from './events.builders';
import { PaginatedDto } from '../../application/DTO/paginated.dto';
import { EventsCardDto } from '../../application/DTO/events/events-card.dto';

@Injectable()
export class EventService {
  constructor(
    private readonly eventsRepository: EventsRepository,
    private readonly eventsBuilders: EventsBuilders,
    @Inject('QueueManagerInterface') private readonly queueManager: QueueManagerInterface,
  ) {}

  async createEvent(body: CreateEventDto): Promise<NewIdResponseDto> {
    if (new Date(body.startAt) < new Date()) {
      throw new BadRequestException('Event start time in the past');
    }

    const newEvent = this.eventsBuilders.buildNewEventEntity(body);
    const event = await this.eventsRepository.save(newEvent);
    this.queueManager.sendMessage(event);
    return { id: event.id };
  }

  async getEventsList(page: number): Promise<PaginatedDto<EventsCardDto>> {
    const [events, count] = await this.eventsRepository.getList(page);
    return {
      data: events,
      totalCount: count,
    };
  }
}
