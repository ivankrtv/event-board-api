import { Injectable } from '@nestjs/common';

import { UserEntity } from '../users/user.entity';
import { ParticipantsEntity } from './participants.entity';
import { ParticipantRoleEnum } from '../../enums/participant-role.enum';

@Injectable()
export class ParticipantsBuilders {
  buildOrganizer(user: UserEntity): ParticipantsEntity {
    const participant = new ParticipantsEntity();
    participant.role = ParticipantRoleEnum.organizer;
    participant.user = user;

    return participant;
  }
}
