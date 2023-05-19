import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import { getAuthToken, setupTestingModule } from './utils';

describe('get event', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = await setupTestingModule(moduleFixture);
    token = await getAuthToken(app, 'krotov.ia@mail.ru');
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Get event', () => {
    it('testSuccess', async () => {
      const response = await request(app.getHttpServer()).get('/event/list/0').auth(token, { type: 'bearer' });

      expect(response.statusCode).toBe(200);
      expect(response).toSatisfyApiSpec();
    });
  });
});
