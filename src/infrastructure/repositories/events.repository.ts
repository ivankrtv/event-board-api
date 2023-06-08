import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EventEntity } from '../../domain/events/event.entity';
import { FileEventRepositoryInterface } from '../../domain/repositories-interfaces/file.event-repository.interface';
import { ParticipantRoleEnum } from '../../enums/participant-role.enum';

@Injectable()
export class EventsRepository implements FileEventRepositoryInterface {
  constructor(
    @InjectRepository(EventEntity)
    protected repo: Repository<EventEntity>,
  ) {}

  async save(event: EventEntity): Promise<EventEntity> {
    return await this.repo.save(event);
  }

  async getList(page: number): Promise<[EventEntity[], number]> {
    const pageNum = page * 15;
    return await this.repo
      .createQueryBuilder('events')
      .leftJoinAndSelect('events.participants', 'participants')
      .leftJoinAndSelect('participants.user', 'users')
      .where('events.startAt >= :now', { now: new Date() })
      .andWhere(`events.status = 'active'`)
      .take(15)
      .skip(pageNum)
      .getManyAndCount();
  }

  async getOne(id: string): Promise<EventEntity> {
    return await this.repo
      .createQueryBuilder('events')
      .leftJoinAndSelect('events.participants', 'participants')
      .leftJoinAndSelect('participants.user', 'users')
      .where('events.id = :id', { id: id })
      .getOne();
  }

  async getOneWithOrganizerOrFail(id: string): Promise<EventEntity> {
    const event = await this.repo
      .createQueryBuilder('events')
      .innerJoinAndSelect('events.participants', 'participants', 'participants.role = :role', {
        role: ParticipantRoleEnum.organizer,
      })
      .innerJoinAndSelect('participants.user', 'users')
      .where('events.id = :id', { id: id })
      .getOne();

    if (!event) {
      throw new NotFoundException(`Event with id: ${id} not found`);
    }

    return event;
  }
}
