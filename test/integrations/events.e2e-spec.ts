import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../../src/app.module';
import { UserTestBuilder } from '../builders/user.test-builder';
import { setupTestingModule } from '../utils';
import { EventTestBuilder } from '../builders/event.test-builder';
import { truncateDatabase } from '../../src/infrastructure/database/truncate-database';

describe('Events (e2e)', () => {
  let app: INestApplication;
  let user: UserTestBuilder;

  beforeAll(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = await setupTestingModule(testModule);

    const userBuilder = new UserTestBuilder();
    user = await userBuilder.build();
  });

  beforeEach(async () => await truncateDatabase());

  afterAll(async () => app.close());

  describe('list all event', () => {
    it('testSuccess', async () => {
      const response = await request(app.getHttpServer()).get('/event/list/0').auth(user.authToken, { type: 'bearer' });

      expect(response.statusCode).toBe(200);
      expect(response).toSatisfyApiSpec();
    });

    it('test event builder', async () => {
      const eventBuilder = new EventTestBuilder();
      const event = await eventBuilder.build();

      expect(event.id).toBeDefined();
    });
  });
});
