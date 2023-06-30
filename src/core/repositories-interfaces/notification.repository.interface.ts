import { NotificationEntity } from '../entities/notification/notification.entity';

export abstract class NotificationRepositoryInterface {
  abstract create(notification: NotificationEntity): Promise<void>;
  abstract save(notification: NotificationEntity): Promise<void>;
  abstract findAll(): Promise<NotificationEntity[]>;
  abstract findById(id: string): Promise<NotificationEntity | null>;
  abstract countByRecipientId(recipientId: string): Promise<number>;
  abstract findManyByRecipientId(recipientId: string): Promise<NotificationEntity[]>;
}
