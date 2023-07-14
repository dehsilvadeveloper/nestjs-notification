import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const apiGlobalPrefix = configService.get<string>('apiConfig.name') ?? '';
  const apiDefaultVersion = configService.get<string>('apiConfig.defaultVersion') ?? '';

  app.setGlobalPrefix(apiGlobalPrefix);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: apiDefaultVersion,
  });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.APP_INTERNAL_PORT ? parseInt(process.env.APP_INTERNAL_PORT) : 3000);
}
bootstrap();
