import { Notification as PrismaNotification } from '@prisma/client';
import { NotificationEntity } from '@core/entities/notification/notification.entity';
import { Category } from '@core/value-objects/notification/category';
import { Content } from '@core/value-objects/notification/content';

export class NotificationPrismaMapper {
  private constructor() {
    throw new Error('NotificationPrismaMapper is a static class and should not be instantiated');
  }

  public static toPrisma(notification: NotificationEntity): PrismaNotification {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category.value,
      createdAt: notification.createdAt,
      readAt: notification.readAt ?? null,
      canceledAt: notification.canceledAt ?? null,
      recipientId: notification.recipientId,
    };
  }

  public static toDomain(notification: PrismaNotification): NotificationEntity {
    return new NotificationEntity(
      {
        content: new Content(notification.content),
        category: new Category(notification.category),
        createdAt: notification.createdAt,
        readAt: notification.readAt,
        canceledAt: notification.canceledAt,
        recipientId: notification.recipientId,
      },
      notification.id,
    );
  }
}
