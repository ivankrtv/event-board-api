import { EventEntity } from '../../src/domain/events/event.entity';
import { EventMood } from '../../src/enums/event-mood';
import { EventsGenderEnum } from '../../src/enums/events-gender.enum';
import { EventCategory } from '../../src/enums/event-category';
import { EventStatusEnum } from '../../src/enums/event-status.enum';
import { ParticipantRoleEnum } from '../../src/enums/participant-role.enum';
import dataSource from '../../configs/datasource';
import { UserEntity } from '../../src/domain/users/user.entity';
import { UserTestBuilder } from './user.test-builder';
import { ParticipantsTestBuilder } from './participants.test-builder';
import { ParticipantsEntity } from '../../src/domain/participants/participants.entity';
import { EventsTransactions } from '../../src/infrastructure/transactions/events.transactions';
import { randomUUID } from 'crypto';

export class EventTestBuilder {
  constructor() {
    this.eventData.image = null;
    this.eventData.mood = EventMood.active;
    this.eventData.eventPlace = 'Галерея';
    this.eventData.gender = EventsGenderEnum.all;
    this.eventData.participants = [];
    this.eventData.category = EventCategory.culturalLeisure;
    this.eventData.startAt = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10);
    this.eventData.peopleJoined = 1;
    this.eventData.peopleNeed = 10;
    this.eventData.status = EventStatusEnum.active;
    this.eventData.title = 'Тестовое событие';
    this.eventData.description = 'тест тест тест тест тест';
    this.eventData.createdAt = new Date();
    this.eventData.dormitory = null;
  }

  public eventData: EventEntity = new EventEntity();

  public async build(organizerUser: UserEntity = null): Promise<EventEntity> {
    let user: UserEntity = organizerUser;

    if (organizerUser === null) {
      const userBuilder = new UserTestBuilder();
      userBuilder.userData.name = 'organizer';
      user = await userBuilder.build();
    }

    await dataSource.initialize();

    const newId = randomUUID();

    const eventOrganizer = new ParticipantsEntity();
    eventOrganizer.role = ParticipantRoleEnum.organizer;
    eventOrganizer.user = user;
    const newEventOrganizer = await dataSource.manager.save<ParticipantsEntity>(eventOrganizer);

    this.eventData.participants = [newEventOrganizer];
    this.eventData.id = newId;
    await dataSource.manager.save<EventEntity>(this.eventData);

    await dataSource.destroy();

    return this.eventData;
  }
}
