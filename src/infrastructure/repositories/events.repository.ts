import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EventEntity } from '../../domain/events/event.entity';

@Injectable()
export class EventsRepository {
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
      .select([
        'events.id',
        'events.image',
        'events.title',
        'events.startAt',
        'events.eventPlace',
        'events.peopleNeed',
        'events.peopleJoined',
        'events.status',
      ])
      .where('events.startAt >= :now', { now: new Date() })
      .andWhere(`events.status = 'active'`)
      .take(15)
      .skip(pageNum)
      .getManyAndCount();
  }
}
