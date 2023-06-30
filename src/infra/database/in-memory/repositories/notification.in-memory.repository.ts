import { NotificationEntity } from '@core/entities/notification/notification.entity';
import { NotificationRepositoryInterface } from '@core/repositories-interfaces/notification.repository.interface';

export class NotificationInMemoryRepository implements NotificationRepositoryInterface {
  private notifications: NotificationEntity[] = [];

  async create(notification: NotificationEntity): Promise<void> {
    this.notifications.push(notification);
  }

  async save(notification: NotificationEntity): Promise<void> {
    const index = this.notifications.findIndex(n => n.id === notification.id);

    this.notifications[index] = notification;
  }

  async findAll(): Promise<NotificationEntity[]> {
    return this.notifications;
  }

  async findById(id: string): Promise<NotificationEntity | null> {
    return this.notifications.find(n => n.id === id) ?? null;
  }

  async countByRecipientId(recipientId: string): Promise<number> {
    const filtered = this.notifications.filter(n => n.recipientId === recipientId);

    return filtered.length;
  }

  async findManyByRecipientId(recipientId: string): Promise<NotificationEntity[]> {
    return this.notifications.filter(n => n.recipientId === recipientId);
  }
}
