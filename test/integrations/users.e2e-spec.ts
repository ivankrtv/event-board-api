import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { UserTestBuilder } from '../builders/user.test-builder';
import { EventTestBuilder } from '../builders/event.test-builder';
import { AppModule } from '../../src/app.module';
import { getAuthToken, setupTestingModule } from '../utils';
import { truncateDatabase } from '../../src/infrastructure/database/truncate-database';

describe('Users (e2e)', () => {
  let app: INestApplication;
  let token: string;
  const userBuilder = new UserTestBuilder();
  const eventBuilder = new EventTestBuilder();

  beforeAll(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = await setupTestingModule(testModule);

    const user = await userBuilder.build();
    token = await getAuthToken(app, user.email);
  });

  afterEach(async () => await truncateDatabase());

  afterAll(async () => app.close());

  describe('Get profile info', () => {
    it('success', async () => {
      const response = await request(app.getHttpServer()).get('/user/profile-info').auth(token, { type: 'bearer' });

      expect(response.statusCode).toBe(200);
      expect(response).toSatisfyApiSpec();
    });
  });
});
