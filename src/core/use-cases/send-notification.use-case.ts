import { Injectable } from '@nestjs/common';
import { ContentEntity } from '../entities/notification/content.entity';
import { NotificationEntity } from '../entities/notification/notification.entity';
import { NotificationRepositoryInterface } from '../repositories-interfaces/notification.repository.interface';

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
  constructor(private readonly notificationsRepository: NotificationRepositoryInterface) {}

  async execute(request: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
    const { recipientId, content, category } = request;

    const notification = new NotificationEntity({
      recipientId,
      content: new ContentEntity(content),
      category,
    });

    await this.notificationsRepository.create(notification);

    return { notification };
  }
}
