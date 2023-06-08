import { EventEntity } from '../../src/domain/events/event.entity';
import { UserEntity } from '../../src/domain/users/user.entity';
import { ParticipantRoleEnum } from '../../src/enums/participant-role.enum';
import { ParticipantsEntity } from '../../src/domain/participants/participants.entity';
import dataSource from '../../configs/datasource';

export class ParticipantsTestBuilder {
  async build(event: EventEntity, user: UserEntity, role: ParticipantRoleEnum): Promise<ParticipantsEntity> {
    const participant = new ParticipantsEntity();
    participant.event = event;
    participant.user = user;
    participant.role = role;

    event.participants.push(participant);

    await dataSource.initialize();
    await dataSource.manager.save<ParticipantsEntity>(participant);
    await dataSource.manager.save<EventEntity>(event);
    await dataSource.destroy();

    return participant;
  }
}
