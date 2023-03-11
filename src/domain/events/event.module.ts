import { Module } from '@nestjs/common';
import { EventsRepository } from '../../infrastructure/repositories/events.repository';
import { EventController } from '../../application/controllers/event.controller';
import { EventService } from './event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity])],
  controllers: [EventController],
  providers: [EventService, EventsRepository],
})
export class EventModule {}
