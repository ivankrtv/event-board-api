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

  async create(event: EventEntity, organizerAndParticipant: ParticipantsEntity[]): Promise<EventEntity> {
    const queryRunner = await this.startTransaction();
    try {
      const participants = await queryRunner.manager.save<ParticipantsEntity[]>(organizerAndParticipant);

      event.participants = participants;
      const newEvent = await queryRunner.manager.save<EventEntity>(event);

      await queryRunner.commitTransaction();
      return newEvent;
    } catch (exception) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Error in create event transaction');
    } finally {
      await queryRunner.release();
    }
  }

  async joinToEvent(event: EventEntity, participant: ParticipantsEntity): Promise<void> {
    const queryRunner = await this.startTransaction();
    try {
      const newParticipant = await queryRunner.manager.save<ParticipantsEntity>(participant);

      event.participants.push(newParticipant);
      await queryRunner.manager.save<EventEntity>(event);

      await queryRunner.commitTransaction();
    } catch (exception) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Error in join to event transaction');
    } finally {
      await queryRunner.release();
    }
  }
}
