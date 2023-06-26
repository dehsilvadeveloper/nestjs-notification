import { NotificationEntity } from '@core/entities/notification/notification.entity';
import { NotificationDto } from '@infra/http/dtos/notification.dto';

export class NotificationViewModel {
  private constructor() {
    throw new Error('NotificationViewModel is a static class and should not be instantiated');
  }

  public static toHttp(notification: NotificationEntity): NotificationDto {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category.value,
      createdAt: notification.createdAt,
      readAt: notification.readAt,
      canceledAt: notification.canceledAt,
      recipientId: notification.recipientId,
    };
  }
}
