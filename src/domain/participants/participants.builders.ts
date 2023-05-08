import { Injectable } from '@nestjs/common';

import { UserEntity } from '../users/user.entity';
import { ParticipantsEntity } from './participants.entity';
import { ParticipantRoleEnum } from '../../enums/participant-role.enum';

@Injectable()
export class ParticipantsBuilders {
  buildOrganizer(user: UserEntity): ParticipantsEntity[] {
    const organizer = new ParticipantsEntity();
    organizer.role = ParticipantRoleEnum.organizer;
    organizer.user = user;

    const participant = new ParticipantsEntity();
    participant.role = ParticipantRoleEnum.joiner;
    participant.user = user;

    return [organizer, participant];
  }

  buildParticipant(user: UserEntity): ParticipantsEntity {
    const participant = new ParticipantsEntity();
    participant.role = ParticipantRoleEnum.joiner;
    participant.user = user;

    return participant;
  }
}
