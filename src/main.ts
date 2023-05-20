import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { RedocModule } from '@juicyllama/nestjs-redoc';
import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

import { AppModule } from './app.module';
import { redocOptions } from '../configs/redoc/redoc-options';
import { ValidationException } from './infrastructure/Exceptions/ValidationException';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: '*',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      skipUndefinedProperties: true,
      exceptionFactory: (errors) => {
        throw new ValidationException(errors);
      },
    }),
  );

  const docsConfig = new DocumentBuilder()
    .setTitle('Event Board API')
    .setDescription('API to event board server application')
    .setVersion('0.1.0')
    .build();

  const document = SwaggerModule.createDocument(app, docsConfig);
  await RedocModule.setup('/api', app, document, redocOptions);

  await app.listen(8080);
  console.log('server start on 8080');
}
bootstrap();
