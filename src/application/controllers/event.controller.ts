import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { EventService } from '../../domain/events/event.service';
import { CreateEventDto } from '../DTO/events/create-event.dto';
import { NewIdResponseDto } from '../DTO/new-id-response.dto';
import { ApiPaginatedResponse } from '../decorators/api-paginated-response';
import { EventsCardDto } from '../DTO/events/events-card.dto';
import { Auth } from '../decorators/auth.decorator';
import { PaginatedDto } from '../DTO/paginated.dto';

@Auth()
@ApiTags('event')
@Controller('/event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiOkResponse({ type: NewIdResponseDto, description: 'Event created successfully' })
  @Post('/create')
  async createEvent(@Body() body: CreateEventDto, @Req() req): Promise<NewIdResponseDto> {
    return await this.eventService.createEvent(body, req.user.id);
  }

  @ApiPaginatedResponse(EventsCardDto)
  @ApiParam({ name: 'page', type: 'number' })
  @Get('/list/:page')
  async getEventsList(@Param() params: { page: number }, @Req() req): Promise<PaginatedDto<EventsCardDto>> {
    return await this.eventService.getEventsList(params.page, req.user.id);
  }
}
