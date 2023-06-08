import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';

import { AppModule } from '../app.module';
import * as fs from 'fs';

async function buildOpenAPI() {
  const path = process.argv[2];
  if (!path) {
    return new Error('not set path to output file arg');
  }

  // const module: TestingModule = await Test.createTestingModule({
  //   imports: [AppModule],
  // }).compile();
  // const app = module.createNestApplication();
  const app = await NestFactory.create(AppModule, { bodyParser: false });

  const config = new DocumentBuilder()
    .setTitle('Selfschool API')
    .setDescription('Selfschool backend API')
    .setVersion(process.env.npm_package_version)
    .addTag('selfschool')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  fs.writeFileSync(path, JSON.stringify(document), 'utf-8');
}

buildOpenAPI();
