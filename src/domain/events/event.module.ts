import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventsRepository } from '../../infrastructure/repositories/events.repository';
import { EventController } from '../../application/controllers/event.controller';
import { EventService } from './event.service';
import { EventEntity } from './event.entity';
import { EventsBuilders } from './events.builders';
import { QueueManager } from '../../infrastructure/managers/queue.manager';
import { QueueManagerInterface } from '../managers-interfaces/queue-manager.interface';
import { UsersRepository } from '../../infrastructure/repositories/users.repository';
import { UserEntity } from '../users/user.entity';
import { EventsTransactions } from '../../infrastructure/transactions/events.transactions';
import { ParticipantsBuilders } from '../participants/participants.builders';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity, UserEntity])],
  controllers: [EventController],
  providers: [
    EventService,
    EventsRepository,
    EventsBuilders,
    UsersRepository,
    ParticipantsBuilders,
    EventsTransactions,
    { provide: 'QueueManagerInterface', useClass: QueueManager },
  ],
})
export class EventModule {}
