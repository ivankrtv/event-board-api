import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(cookieParser());

  const docsConfig = new DocumentBuilder()
    .setTitle('Event Board API')
    .setDescription('API to event board server application')
    .setVersion('0.1.0')
    .build();

  const document = SwaggerModule.createDocument(app, docsConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(8080);
  console.log('server start on 8080');
}
bootstrap();
