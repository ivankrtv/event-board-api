import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../../src/app.module';
import { UserTestBuilder } from '../builders/user.test-builder';
import { getAuthToken, setupTestingModule } from '../utils';
import { EventTestBuilder } from '../builders/event.test-builder';
import { truncateDatabase } from '../../src/infrastructure/database/truncate-database';

describe('Events (e2e)', () => {
  let app: INestApplication;
  let token: string;
  const userBuilder = new UserTestBuilder();

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
  });
});
