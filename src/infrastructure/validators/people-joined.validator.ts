import { applyDecorators } from '@nestjs/common';

import { PeopleNeedValidator } from './people-need.validator';

export function PeopleJoinedValidator() {
  return applyDecorators(PeopleNeedValidator);
}
