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
import { ApiNotFoundErrorDto } from '../DTO/errors/api-not-found-error.dto';
import { ApiUserIsAlreadyParticipantErrorDto } from '../DTO/errors/api-user-is-already-participant-error.dto';
import { ApiBadRequest } from '../../docs/api/api-bad-request.decorator';
import { ApiValidationErrorDto } from '../DTO/errors/api-validation-error.dto';
import { PostMethod } from '../../docs/api/common/methods/post-method.decorator';
import { GetMethod } from '../../docs/api/common/methods/get-method.decorator';
import { StartAtInThePastException } from '../../infrastructure/Exceptions/start-at-in-the-past-exception';
import { ApiStartAtInThePastErrorDto } from '../DTO/errors/api-start-at-in-the-past-error.dto';
import { GetListingDto } from '../DTO/events/get-listing.dto';

@Auth()
@ApiTags('event')
@Controller('/event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiCreatedResponse({ type: NewIdResponseDto, description: 'Event created successfully' })
  @ApiBadRequest(ApiStartAtInThePastErrorDto)
  @PostMethod('/create', 'Create event', true)
  async createEvent(@Body() body: CreateEventDto, @Req() req): Promise<NewIdResponseDto> {
    return await this.eventService.createEvent(body, req.user.id);
  }

  @ApiPaginatedResponse(EventsCardDto)
  @ApiBadRequest()
  @GetMethod('/list/:page', 'list events', true)
  async getEventsList(@Param() params: GetListingDto, @Req() req): Promise<PaginatedDto<EventsCardDto>> {
    return await this.eventService.getEventsList(params.page, req.user.id);
  }

  @ApiOkResponse({ description: 'Joined success' })
  @ApiNotFoundResponse({ description: 'Not found event or user entity', type: ApiNotFoundErrorDto })
  @ApiBadRequest(ApiUserIsAlreadyParticipantErrorDto)
  @PostMethod('/join/:eventId', 'Join to event', true)
  async joinToEvent(@Param() params: JoinToEventDto, @Req() req): Promise<void> {
    return await this.eventService.joinToEvent(params.eventId, req.user.id);
  }
}
