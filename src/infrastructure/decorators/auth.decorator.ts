import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';

import { AuthGuard } from '../../application/guards/auth.guard';
import { ApiNotFoundErrorDto } from '../../application/DTO/errors/api-unauthorized-error.dto';

export function Auth() {
  return applyDecorators(
    UseGuards(AuthGuard),
    ApiUnauthorizedResponse({ type: ApiNotFoundErrorDto, description: 'Неавторизованный запрос' }),
  );
}
