import { applyDecorators, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../guards/auth.guard';

export function Auth() {
  return applyDecorators(UseGuards(AuthGuard));
}
