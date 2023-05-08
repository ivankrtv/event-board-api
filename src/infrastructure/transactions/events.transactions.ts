import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseTransaction } from './base.transaction';
import { EventEntity } from '../../domain/events/event.entity';
import { ParticipantsEntity } from '../../domain/participants/participants.entity';

@Injectable()
export class EventsTransactions extends BaseTransaction {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  async create(event: EventEntity, organizer: ParticipantsEntity): Promise<EventEntity> {
    const queryRunner = await this.startTransaction();
    try {
      const newOrganizer = await queryRunner.manager.save<ParticipantsEntity>(organizer);

      event.participants = [newOrganizer];
      const newEvent = await queryRunner.manager.save<EventEntity>(event);

      await queryRunner.commitTransaction();
      return newEvent;
    } catch (exception) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Error in create event method');
    } finally {
      await queryRunner.release();
    }
  }
}
