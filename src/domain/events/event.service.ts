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
import { UserIsAlreadyParticipantException } from '../../application/Exceptions/UserIsAlreadyParticipantException';

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

  async createEvent(body: CreateEventDto, userId: number): Promise<NewIdResponseDto> {
    if (new Date(body.startAt) < new Date()) {
      throw new BadRequestException('Event start time in the past');
    }

    const user = await this.userRepository.getOne(userId);

    const newEvent = this.eventsBuilders.buildNewEventEntity(body);
    const organizer = this.participantBuilders.buildOrganizer(user);

    const event = await this.eventTransactions.create(newEvent, organizer);

    await this.queueManager.sendMessage(event);

    return { id: event.id };
  }

  async getEventsList(page: number, userId: number): Promise<PaginatedDto<EventsCardDto>> {
    const [events, count] = await this.eventsRepository.getList(page);

    const eventsCards = events.map((event) => {
      return EventsCardDto.createByEventEntityAndUserId(event, userId);
    });

    return new PaginatedDto<EventsCardDto>(eventsCards, count);
  }

  async joinToEvent(eventId: number, userId: number): Promise<void> {
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
}
