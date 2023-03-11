import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventService } from '../../domain/events/event.service';
import { CreateEventDto } from '../DTO/events/create-event.dto';
import { NewIdResponseDto } from '../DTO/new-id-response.dto';

@Controller('/event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('/create')
  async createEvent(@Body() body: CreateEventDto): Promise<NewIdResponseDto> {
    return await this.eventService.createEvent(body);
  }

  @Get('/list')
  getEventsList() {
    return this.eventService.getEventsList();
  }
}
