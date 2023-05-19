import { EntityManager } from 'typeorm';

import { EventEntity } from '../../src/domain/events/event.entity';
import { EventMood } from '../../src/enums/event-mood';
import { EventsGenderEnum } from '../../src/enums/events-gender.enum';
import { EventCategory } from '../../src/enums/event-category';
import { EventStatusEnum } from '../../src/enums/event-status.enum';
import { ParticipantsEntity } from '../../src/domain/participants/participants.entity';
import { UserTestBuilder } from './user.test-builder';
import { ParticipantRoleEnum } from '../../src/enums/participant-role.enum';
import dataSource from '../../configs/datasource';
import { UserEntity } from '../../src/domain/users/user.entity';
import { setupUser } from '../utils';

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

  public async build(participant: ParticipantsEntity = null): Promise<EventTestBuilder> {
    let eventOrganizer = participant;
    // if (participant === null) {
    //   const userData = new UserTestBuilder().userData;
    //
    //   eventOrganizer = new ParticipantsEntity();
    //   eventOrganizer.role = ParticipantRoleEnum.organizer;
    //   eventOrganizer.user = user.userData;
    // }

    await dataSource.initialize();
    if (participant === null) {
      const userData = setupUser();
      userData.name = 'organizer';
      const user = await dataSource.manager.save<UserEntity>(userData);

      eventOrganizer = new ParticipantsEntity();
      eventOrganizer.role = ParticipantRoleEnum.organizer;
      eventOrganizer.user = user;
    }
    const newEventOrganizer = await dataSource.manager.save<ParticipantsEntity>(eventOrganizer);

    this.eventData.participants = [newEventOrganizer];
    this.eventData = await dataSource.manager.save<EventEntity>(this.eventData);
    // this.eventData = await dataSource.manager.save<EventEntity>(this.eventData);
    // eventOrganizer.event = this.eventData;
    // await dataSource.manager.save<ParticipantsEntity>(eventOrganizer);

    await dataSource.destroy();

    return this;
  }
}
