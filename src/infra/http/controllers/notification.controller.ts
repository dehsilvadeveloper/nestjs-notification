import { Controller, Param, Body, Get, Post, Patch } from '@nestjs/common';
import { SendNotificationUseCase } from '@core/use-cases/send-notification.use-case';
import { ReadNotificationUseCase } from '@core/use-cases/read-notification.use-case';
import { UnreadNotificationUseCase } from '@core/use-cases/unread-notification.use-case';
import { CancelNotificationUseCase } from '@core/use-cases/cancel-notification.use-case';
import { ListNotificationUseCase } from '@core/use-cases/list-notification.use-case';
import { CountRecipientNotificationUseCase } from '@core/use-cases/count-recipient-notification.use-case';
import { GetRecipientNotificationUseCase } from '@core/use-cases/get-recipient-notification.use-case';
import { CreateNotificationDto } from '@infra/http/dtos/create-notification.dto';
import { NotificationDto } from '@infra/http/dtos/notification.dto';
import { NotificationViewModel } from '../view-models/notification.view-model';
import { NotificationListViewModel } from '../view-models/notification-list.view-model';
import { NotificationCountByRecipientViewModel } from '../view-models/notification-count-by-recipient.view-model';
import { NotificationListByRecipientViewModel } from '../view-models/notification-list-by-recipient.view-model';

@Controller('notifications')
export class NotificationController {
  constructor(
    private sendNotificationUseCase: SendNotificationUseCase,
    private readNotificationUseCase: ReadNotificationUseCase,
    private unreadNotificationUseCase: UnreadNotificationUseCase,
    private cancelNotificationUseCase: CancelNotificationUseCase,
    private listNotificationUseCase: ListNotificationUseCase,
    private countRecipientNotificationUseCase: CountRecipientNotificationUseCase,
    private getRecipientNotificationUseCase: GetRecipientNotificationUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateNotificationDto): Promise<{ notification: NotificationDto }> {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotificationUseCase.execute({
      content,
      category,
      recipientId,
    });

    return { notification: NotificationViewModel.toHttp(notification) };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string): Promise<void> {
    await this.readNotificationUseCase.execute({ id });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string): Promise<void> {
    await this.unreadNotificationUseCase.execute({ id });
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string): Promise<void> {
    await this.cancelNotificationUseCase.execute({ id });
  }

  @Get()
  async list(): Promise<NotificationListViewModel> {
    const { notifications } = await this.listNotificationUseCase.execute();

    return {
      notifications: notifications.map(NotificationViewModel.toHttp),
    };
  }

  @Get('recipients/:recipientId/count')
  async countByRecipientId(
    @Param('recipientId') recipientId: string,
  ): Promise<NotificationCountByRecipientViewModel> {
    const { count } = await this.countRecipientNotificationUseCase.execute({
      recipientId,
    });

    return { count };
  }

  @Get('recipients/:recipientId')
  async listByRecipientId(
    @Param('recipientId') recipientId: string,
  ): Promise<NotificationListByRecipientViewModel> {
    const { notifications } = await this.getRecipientNotificationUseCase.execute({
      recipientId,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHttp),
    };
  }
}
