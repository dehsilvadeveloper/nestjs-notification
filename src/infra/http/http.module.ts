import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { NotificationController } from './controllers/notification.controller';
import { SendNotificationUseCase } from '@core/use-cases/send-notification.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [SendNotificationUseCase],
})
export class HttpModule {}
