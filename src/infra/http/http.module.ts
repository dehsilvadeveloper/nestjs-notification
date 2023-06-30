import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { NotificationController } from './controllers/notification.controller';
import { SendNotificationUseCase } from '@core/use-cases/send-notification.use-case';
import { ReadNotificationUseCase } from '@core/use-cases/read-notification.use-case';
import { UnreadNotificationUseCase } from '@core/use-cases/unread-notification.use-case';
import { CancelNotificationUseCase } from '@core/use-cases/cancel-notification.use-case';
import { ListNotificationUseCase } from '@core/use-cases/list-notification.use-case';
import { CountRecipientNotificationUseCase } from '@core/use-cases/count-recipient-notification.use-case';
import { GetRecipientNotificationUseCase } from '@core/use-cases/get-recipient-notification.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [
    SendNotificationUseCase,
    ReadNotificationUseCase,
    UnreadNotificationUseCase,
    CancelNotificationUseCase,
    ListNotificationUseCase,
    CountRecipientNotificationUseCase,
    GetRecipientNotificationUseCase,
  ],
})
export class HttpModule {}
