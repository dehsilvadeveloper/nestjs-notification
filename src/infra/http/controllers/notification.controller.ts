import { Controller, Param, Body, Post, Patch } from '@nestjs/common';
import { SendNotificationUseCase } from '@core/use-cases/send-notification.use-case';
import { ReadNotificationUseCase } from '@core/use-cases/read-notification.use-case';
import { UnreadNotificationUseCase } from '@core/use-cases/unread-notification.use-case';
import { CancelNotificationUseCase } from '@core/use-cases/cancel-notification.use-case';
import { CreateNotificationDto } from '@infra/http/dtos/create-notification.dto';
import { NotificationViewModel } from '../view-models/notification.view-model';

@Controller('notifications')
export class NotificationController {
  constructor(
    private sendNotificationUseCase: SendNotificationUseCase,
    private readNotificationUseCase: ReadNotificationUseCase,
    private unreadNotificationUseCase: UnreadNotificationUseCase,
    private cancelNotificationUseCase: CancelNotificationUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateNotificationDto) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotificationUseCase.execute({
      content,
      category,
      recipientId,
    });

    return { notification: NotificationViewModel.toHttp(notification) };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotificationUseCase.execute({ id });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotificationUseCase.execute({ id });
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotificationUseCase.execute({ id });
  }
}
