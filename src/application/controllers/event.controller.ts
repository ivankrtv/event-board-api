import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { EventService } from '../../domain/events/event.service';
import { CreateEventDto } from '../DTO/events/create-event.dto';
import { NewIdResponseDto } from '../DTO/new-id-response.dto';
import { ApiPaginatedResponse } from '../../docs/api/api-paginated-response';
import { EventsCardDto } from '../DTO/events/events-card.dto';
import { Auth } from '../../infrastructure/decorators/auth.decorator';
import { PaginatedDto } from '../DTO/paginated.dto';
import { JoinToEventDto } from '../DTO/events/join-to-event.dto';
import { NotFoundExceptionDto } from '../DTO/exceptions/NotFoundExceptionDto';
import { UserIsAlreadyParticipantDto } from '../DTO/exceptions/UserIsAlreadyParticipantDto';
import { ApiBadRequest } from '../../docs/api/api-bad-request.decorator';
import { ApiValidationErrorDto } from '../DTO/errors/api-validation-error.dto';
import { PostMethod } from '../../docs/api/common/methods/post-method.decorator';

@Auth()
@ApiTags('event')
@Controller('/event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiCreatedResponse({ type: NewIdResponseDto, description: 'Event created successfully' })
  @PostMethod('/create', 'Create event', true)
  async createEvent(@Body() body: CreateEventDto, @Req() req): Promise<NewIdResponseDto> {
    console.log(body);
    return await this.eventService.createEvent(body, req.user.id);
  }

  @ApiPaginatedResponse(EventsCardDto)
  @ApiParam({ name: 'page', type: 'number' })
  @Get('/list/:page')
  async getEventsList(@Param() params: { page: number }, @Req() req): Promise<PaginatedDto<EventsCardDto>> {
    return await this.eventService.getEventsList(params.page, req.user.id);
  }

  @ApiOkResponse({ description: 'Joined success' })
  @ApiNotFoundResponse({ description: 'Not found event or user entity', type: NotFoundExceptionDto })
  @ApiBadRequestResponse({ description: 'User is already participant', type: ApiValidationErrorDto })
  // @ApiBadRequest(UserIsAlreadyParticipantDto)
  @Post('/join/:eventId')
  async joinToEvent(@Param() params: JoinToEventDto, @Req() req): Promise<void> {
    return await this.eventService.joinToEvent(params.eventId, req.user.id);
  }
}
