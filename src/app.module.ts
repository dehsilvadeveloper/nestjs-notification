import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from './infra/http/http.module';
import { DatabaseModule } from '@infra/database/database.module';
import apiConfig from './infra/config/api.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [apiConfig] }),
    HttpModule,
    DatabaseModule,
  ],
})
export class AppModule {}
