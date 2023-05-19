import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TestingModule } from '@nestjs/testing';
import jestOpenAPI from 'jest-openapi';
import * as request from 'supertest';

async function setupTestingModule(moduleFixture: TestingModule): Promise<INestApplication> {
  const app = moduleFixture.createNestApplication();

  const config = new DocumentBuilder()
    .setTitle('eventboard API')
    .setDescription('eventboard backend API')
    .setVersion('0.1.0')
    .addTag('eventboard')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.init();

  await request(app.getHttpServer())
    .get('/api/docs-json')
    .then((res) => jestOpenAPI(res.body));

  return app;
}

async function getAuthToken(app: INestApplication, email: 'krotov.ia@mail.ru'): Promise<string> {
  return request(app.getHttpServer())
    .post('/auth/login')
    .send({
      email,
      password: '12345678',
    })
    .set('User-Agent', 'tests')
    .then((res) => res.body?.token);
}

export { setupTestingModule, getAuthToken };
