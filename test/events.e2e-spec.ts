import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/typeorm';

import { AppModule } from '../src/app.module';

describe('Events (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = testModule.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {});

  afterAll(async () => app.close());

  describe('list event', async () => {});
});
