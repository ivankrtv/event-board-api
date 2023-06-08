import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../../src/app.module';
import { UserTestBuilder } from '../builders/user.test-builder';
import { getAuthToken, setupTestingModule } from '../utils';
import { EventTestBuilder } from '../builders/event.test-builder';
import { truncateDatabase } from '../../src/infrastructure/database/truncate-database';
import { ApiUserIsAlreadyParticipantErrorDto } from '../../src/application/DTO/errors/api-user-is-already-participant-error.dto';
import { randomUUID } from 'crypto';
import { ApiStartAtInThePastErrorDto } from '../../src/application/DTO/errors/api-start-at-in-the-past-error.dto';
import { ParticipantsTestBuilder } from '../builders/participants.test-builder';
import { ParticipantRoleEnum } from '../../src/enums/participant-role.enum';
import { EventResponseDto } from '../../src/application/DTO/events/event-response.dto';

describe('Events (e2e)', () => {
  let app: INestApplication;
  let token: string;
  const userBuilder = new UserTestBuilder();
  const eventBuilder = new EventTestBuilder();
  const participantBuilder = new ParticipantsTestBuilder();

  beforeAll(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = await setupTestingModule(testModule);

    const user = await userBuilder.build();
    token = await getAuthToken(app, user.email);
  });

  beforeEach(async () => await truncateDatabase());

  afterAll(async () => app.close());

  describe('list all event', () => {
    it('testSuccess', async () => {
      await new EventTestBuilder().build();
      const response = await request(app.getHttpServer()).get('/event/list/0').auth(token, { type: 'bearer' });

      expect(response.statusCode).toBe(200);
      expect(response).toSatisfyApiSpec();
    });
  });

  describe('Create event', () => {
    it('success', async () => {
      const newEventData = {
        title: 'Мафия на 12 человек',
        description: 'Мафия на 12 человек',
        eventPlace: 'Парк Горького',
        peopleNeed: 10,
        category: 'polytechOffical',
        mood: 'calm',
        startAt: new Date('2023-11-20T18:00:00'),
        gender: 'all',
      };

      const response = await request(app.getHttpServer())
        .post('/event/create')
        .auth(token, { type: 'bearer' })
        .send(newEventData);

      expect(response).toSatisfyApiSpec();
    });

    it('startAt in the past fail', async () => {
      const newEventData = {
        title: 'Мафия на 12 человек',
        description: 'Мафия на 12 человек',
        eventPlace: 'Парк Горького',
        peopleNeed: 10,
        category: 'polytechOffical',
        mood: 'calm',
        startAt: new Date('2023-01-02T18:00:00'),
        gender: 'all',
      };

      const response = await request(app.getHttpServer())
        .post('/event/create')
        .auth(token, { type: 'bearer' })
        .send(newEventData);

      expect(response.statusCode).toBe(400);
      expect(response.body).toStrictEqual({ ...new ApiStartAtInThePastErrorDto() });
    });
  });

  describe('Join to event', () => {
    it('success', async () => {
      const user = await userBuilder.build();
      const event = await eventBuilder.build();

      const authToken = await getAuthToken(app, user.email);

      const response = await request(app.getHttpServer())
        .post(`/event/join/${event.id}`)
        .auth(authToken, { type: 'bearer' });

      expect(response.statusCode).toBe(200);
      expect(response).toSatisfyApiSpec();
    });

    it('user is already participant fail', async () => {
      const user = await userBuilder.build();
      const event = await eventBuilder.build(user);

      const authToken = await getAuthToken(app, user.email);

      const response = await request(app.getHttpServer())
        .post(`/event/join/${event.id}`)
        .auth(authToken, { type: 'bearer' });

      expect(response.statusCode).toBe(400);
      expect(response.body).toStrictEqual({ ...new ApiUserIsAlreadyParticipantErrorDto() });
    });

    it('event not found fail', async () => {
      const response = await request(app.getHttpServer())
        .post(`/event/join/${randomUUID()}`)
        .auth(token, { type: 'bearer' });

      expect(response.statusCode).toBe(404);
      expect(response).toSatisfyApiSpec();
    });
  });

  describe('get event', () => {
    it('success', async () => {
      const organizer = await userBuilder.build();
      const event = await eventBuilder.build(organizer);

      const newParticipant = await userBuilder.build();
      const authToken = await getAuthToken(app, newParticipant.email);
      await participantBuilder.build(event, newParticipant, ParticipantRoleEnum.joiner);

      const response = await request(app.getHttpServer()).get(`/event/${event.id}`).auth(authToken, { type: 'bearer' });

      expect(response.statusCode).toBe(200);
      expect(response).toSatisfyApiSpec();
    });

    it('event not found fail', async () => {
      const response = await request(app.getHttpServer()).get(`/event/${randomUUID()}`).auth(token, { type: 'bearer' });

      expect(response.statusCode).toBe(404);
      expect(response).toSatisfyApiSpec();
    });
  });
});
