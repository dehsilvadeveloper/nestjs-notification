import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { appConfig } from './infra/config/app.config';
import { apiConfig } from './infra/config/api.config';
import { corsConfig } from './infra/config/cors.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(apiConfig.name);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: apiConfig.defaultVersion,
  });
  app.useGlobalPipes(new ValidationPipe());

  if (corsConfig.enabled) {
    app.enableCors();
  }

  await app.listen(appConfig.internalPort);
}

bootstrap();
