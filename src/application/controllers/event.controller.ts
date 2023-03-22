import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventService } from '../../domain/events/event.service';
import { CreateEventDto } from '../DTO/events/create-event.dto';
import { NewIdResponseDto } from '../DTO/new-id-response.dto';
import { ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { ApiPaginatedResponse } from '../decorators/api-paginated-response';
import { EventsCardDto } from '../DTO/events/events-card.dto';

@Controller('/event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiOkResponse({ type: NewIdResponseDto, description: 'Event created successfully' })
  @Post('/create')
  async createEvent(@Body() body: CreateEventDto): Promise<NewIdResponseDto> {
    return await this.eventService.createEvent(body);
  }

  @ApiPaginatedResponse(EventsCardDto)
  @ApiParam({ name: 'page', type: 'number' })
  @Get('/list/:page')
  async getEventsList(@Param() params: { page: number }) {
    return await this.eventService.getEventsList(params.page);
  }

  @Get('/:eventId')
  async getEvent(@Param() params: { eventId: number }) {
    return await this.eventService.getEvent(params.eventId);
  }
}
