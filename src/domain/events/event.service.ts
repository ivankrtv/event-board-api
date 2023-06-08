import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';

import type { QueueManagerInterface } from '../managers-interfaces/queue-manager.interface';

import { EventsRepository } from '../../infrastructure/repositories/events.repository';
import { CreateEventDto } from '../../application/DTO/events/create-event.dto';
import { NewIdResponseDto } from '../../application/DTO/new-id-response.dto';
import { EventsBuilders } from './events.builders';
import { PaginatedDto } from '../../application/DTO/paginated.dto';
import { EventsCardDto } from '../../application/DTO/events/events-card.dto';
import { UsersRepository } from '../../infrastructure/repositories/users.repository';
import { ParticipantsBuilders } from '../participants/participants.builders';
import { EventsTransactions } from '../../infrastructure/transactions/events.transactions';
import { UserIsAlreadyParticipantException } from '../../infrastructure/Exceptions/UserIsAlreadyParticipantException';
import { StartAtInThePastException } from '../../infrastructure/Exceptions/start-at-in-the-past-exception';
import { EventResponseDto } from '../../application/DTO/events/event-response.dto';

@Injectable()
export class EventService {
  constructor(
    private readonly eventsRepository: EventsRepository,
    private readonly eventsBuilders: EventsBuilders,
    private readonly participantBuilders: ParticipantsBuilders,
    private readonly eventTransactions: EventsTransactions,
    private readonly userRepository: UsersRepository,
    @Inject('QueueManagerInterface') private readonly queueManager: QueueManagerInterface,
  ) {}

  /**
   * @throws StartAtInThePastException
   */
  async createEvent(body: CreateEventDto, userId: string): Promise<NewIdResponseDto> {
    if (new Date(body.startAt) < new Date()) {
      throw new StartAtInThePastException();
    }

    const user = await this.userRepository.getOne(userId);

    const newEvent = this.eventsBuilders.buildNewEventEntity(body);
    const organizer = this.participantBuilders.buildOrganizer(user);

    const event = await this.eventTransactions.create(newEvent, organizer);

    await this.queueManager.sendMessage(event);

    return { id: event.id };
  }

  async getEventsList(page: number, userId: string): Promise<PaginatedDto<EventsCardDto>> {
    const [events, count] = await this.eventsRepository.getList(page);

    const eventsCards = events.map((event) => {
      return EventsCardDto.createByEventEntityAndUserId(event, userId);
    });

    return new PaginatedDto<EventsCardDto>(eventsCards, count);
  }

  async joinToEvent(eventId: string, userId: string): Promise<void> {
    const event = await this.eventsRepository.getOne(eventId);
    if (!event) {
      throw new NotFoundException(`Event with id: ${eventId} not found`);
    }

    const user = await this.userRepository.getOne(userId);
    if (!user) {
      throw new NotFoundException(`User with id: ${userId} not found`);
    }

    const existParticipant = event.participants.find((participant) => participant.user.id === userId);
    if (existParticipant) {
      throw new UserIsAlreadyParticipantException();
    }

    const participant = this.participantBuilders.buildParticipant(user);
    await this.eventTransactions.joinToEvent(event, participant);
  }

  async getEvent(id: string): Promise<EventResponseDto> {
    const event = await this.eventsRepository.getOneWithOrganizerOrFail(id);
    if (!event) {
      throw new NotFoundException(`Event with id: ${id} not found`);
    }

    return new EventResponseDto(event);
  }
}
