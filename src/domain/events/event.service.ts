import { BadRequestException, Injectable } from '@nestjs/common';
import { EventsRepository } from '../../infrastructure/repositories/events.repository';
import { CreateEventDto } from '../../application/DTO/events/create-event.dto';
import { NewIdResponseDto } from '../../application/DTO/new-id-response.dto';
import { EventsBuilders } from './events.builders';
import { PaginatedDto } from '../../application/DTO/paginated.dto';
import { EventsListDto } from '../../application/DTO/events/events-list.dto';
import { QueueManager } from '../../infrastructure/managers/queue.manager';

@Injectable()
export class EventService {
  constructor(
    private readonly eventsRepository: EventsRepository,
    private readonly eventsBuilders: EventsBuilders,
    private readonly queueManager: QueueManager,
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

  async getEventsList(page: number): Promise<PaginatedDto<EventsListDto>> {
    const [events, count] = await this.eventsRepository.getList(page);
    return {
      data: events,
      totalCount: count,
    };
  }
}
