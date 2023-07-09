import {
  Controller,
  UseInterceptors,
  Param,
  Body,
  Header,
  Get,
  Post,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import { NotificationNotFoundErrorInterceptor } from '../interceptors/notification-not-found-error.interceptor';
import { SendNotificationUseCase } from '@core/use-cases/send-notification.use-case';
import { ReadNotificationUseCase } from '@core/use-cases/read-notification.use-case';
import { UnreadNotificationUseCase } from '@core/use-cases/unread-notification.use-case';
import { CancelNotificationUseCase } from '@core/use-cases/cancel-notification.use-case';
import { ListNotificationUseCase } from '@core/use-cases/list-notification.use-case';
import { GetNotificationUseCase } from '@core/use-cases/get-notification.use-case';
import { CountRecipientNotificationUseCase } from '@core/use-cases/count-recipient-notification.use-case';
import { GetRecipientNotificationUseCase } from '@core/use-cases/get-recipient-notification.use-case';
import { CreateNotificationDto } from '@infra/http/dtos/create-notification.dto';
import { NotificationDto } from '@infra/http/dtos/notification.dto';
import { NotificationViewModel } from '../view-models/notification.view-model';

@Controller('notifications')
@UseInterceptors(NotificationNotFoundErrorInterceptor)
export class NotificationController {
  constructor(
    private readonly sendNotificationUseCase: SendNotificationUseCase,
    private readonly readNotificationUseCase: ReadNotificationUseCase,
    private readonly unreadNotificationUseCase: UnreadNotificationUseCase,
    private readonly cancelNotificationUseCase: CancelNotificationUseCase,
    private readonly listNotificationUseCase: ListNotificationUseCase,
    private readonly getNotificationUseCase: GetNotificationUseCase,
    private readonly countRecipientNotificationUseCase: CountRecipientNotificationUseCase,
    private readonly getRecipientNotificationUseCase: GetRecipientNotificationUseCase,
  ) {}

  @Post()
  @Header('content-type', 'application/json')
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
  @Header('content-type', 'application/json')
  async read(@Param('id') id: string): Promise<{ message: string }> {
    await this.readNotificationUseCase.execute({ id });

    return { message: 'The notification was marked as read.' };
  }

  @Patch(':id/unread')
  @Header('content-type', 'application/json')
  async unread(@Param('id') id: string): Promise<{ message: string }> {
    await this.unreadNotificationUseCase.execute({ id });

    return { message: 'The notification was marked as unread.' };
  }

  @Patch(':id/cancel')
  @Header('content-type', 'application/json')
  async cancel(@Param('id') id: string): Promise<{ message: string }> {
    await this.cancelNotificationUseCase.execute({ id });

    return { message: 'The notification was marked as cancelled.' };
  }

  @Get()
  @Header('content-type', 'application/json')
  async list(): Promise<{ notifications: NotificationDto[] }> {
    const { notifications } = await this.listNotificationUseCase.execute();

    return {
      notifications: notifications.map(NotificationViewModel.toHttp),
    };
  }

  @Get(':id')
  @Header('content-type', 'application/json')
  async show(@Param('id') id: string): Promise<{ notification: NotificationDto }> {
    const { notification } = await this.getNotificationUseCase.execute({
      id,
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    return { notification: NotificationViewModel.toHttp(notification) };
  }

  @Get('recipients/:recipientId/count')
  @Header('content-type', 'application/json')
  async countByRecipientId(@Param('recipientId') recipientId: string): Promise<{ total: number }> {
    const { count } = await this.countRecipientNotificationUseCase.execute({
      recipientId,
    });

    return { total: count };
  }

  @Get('recipients/:recipientId')
  @Header('content-type', 'application/json')
  async listByRecipientId(
    @Param('recipientId') recipientId: string,
  ): Promise<{ notifications: NotificationDto[] }> {
    const { notifications } = await this.getRecipientNotificationUseCase.execute({
      recipientId,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHttp),
    };
  }
}
