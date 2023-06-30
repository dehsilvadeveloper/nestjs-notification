import { Injectable } from '@nestjs/common';
import { Category } from '@core/value-objects/notification/category';
import { Content } from '@core/value-objects/notification/content';
import { NotificationEntity } from '@core/entities/notification/notification.entity';
import { NotificationRepositoryInterface } from '@core/repositories-interfaces/notification.repository.interface';

export interface SendNotificationUseCaseRequest {
  recipientId: string;
  content: string;
  category: string;
}

export interface SendNotificationUseCaseResponse {
  notification: NotificationEntity;
}

@Injectable()
export class SendNotificationUseCase {
  constructor(private notificationsRepository: NotificationRepositoryInterface) {}

  async execute(request: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
    const { recipientId, content, category } = request;

    const notification = new NotificationEntity({
      recipientId,
      content: new Content(content),
      category: new Category(category),
    });

    await this.notificationsRepository.create(notification);

    return { notification };
  }
}
