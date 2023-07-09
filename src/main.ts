import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(process.env.API_NAME ?? 'api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: process.env.API_DEFAULT_VERSION,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.APP_INTERNAL_PORT ? parseInt(process.env.APP_INTERNAL_PORT) : 3000);
}
bootstrap();
