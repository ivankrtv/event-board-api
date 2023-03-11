import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventService } from '../../domain/events/event.service';
import { CreateEventDto } from '../DTO/events/create-event.dto';
import { NewIdResponseDto } from '../DTO/new-id-response.dto';
import { ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { ApiPaginatedResponse } from '../decorators/api-paginated-response';
import { EventsListDto } from '../DTO/events/events-list.dto';

@Controller('/event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiOkResponse({ type: NewIdResponseDto, description: 'Event created successfully' })
  @Post('/create')
  async createEvent(@Body() body: CreateEventDto): Promise<NewIdResponseDto> {
    return await this.eventService.createEvent(body);
  }

  @ApiPaginatedResponse(EventsListDto)
  @ApiParam({ name: 'page', type: 'number' })
  @Get('/list/:page')
  async getEventsList(@Param() params: { page: number }) {
    return await this.eventService.getEventsList(params.page);
  }
}
