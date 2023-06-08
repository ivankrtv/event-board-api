import { Request } from 'express';

import { GenderEnum } from '../../enums/gender.enum';

type UserInToken = {
  id: string;
  gender: GenderEnum;
  dormitory: string | null;
};

export type RequestWithUser = Request & { user: UserInToken };
