import { Module } from '@nestjs/common';
import { EventsRepository } from '../../infrastructure/repositories/events.repository';
import { EventController } from '../../application/controllers/event.controller';
import { EventService } from './event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './event.entity';
import { EventsBuilders } from './events.builders';
import { QueueManager } from '../../infrastructure/managers/queue.manager';
import { QueueManagerInterface } from '../managers-interfaces/queue-manager.interface';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity])],
  controllers: [EventController],
  providers: [
    EventService,
    EventsRepository,
    EventsBuilders,
    { provide: 'QueueManagerInterface', useClass: QueueManager },
  ],
})
export class EventModule {}
