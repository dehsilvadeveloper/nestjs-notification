import { Controller, Post, Body } from '@nestjs/common';
import { SendNotificationUseCase } from '@core/use-cases/send-notification.use-case';
import { CreateNotificationDto } from '@infra/http/dtos/create-notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly sendNotificationUseCase: SendNotificationUseCase) {}

  @Post()
  async create(@Body() body: CreateNotificationDto) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotificationUseCase.execute({
      content,
      category,
      recipientId,
    });

    return { notification };
  }
}
