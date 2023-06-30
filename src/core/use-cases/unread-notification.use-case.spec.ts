import { NotificationInMemoryRepository } from '@infra/database/in-memory/repositories/notification.in-memory.repository';
import { UnreadNotificationUseCase } from './unread-notification.use-case';
import { makeNotification } from '@test/factories/notification.factory';
import { NotificationNotFoundError } from '../errors/notification-not-found.error';

describe('Usecase UnreadNotificationUseCase', () => {
  it('should unread a notification', async () => {
    const notificationRepository = new NotificationInMemoryRepository();
    const unreadNotificationUseCase = new UnreadNotificationUseCase(notificationRepository);

    const newNotification = makeNotification({ recipientId: 'user-123', readAt: new Date() });
    await notificationRepository.create(newNotification);

    await unreadNotificationUseCase.execute({ id: newNotification.id });

    const unreadNotification = await notificationRepository.findById(newNotification.id);

    expect(unreadNotification?.readAt).toBeNull();
  });

  it('should not read a non existing notification', async () => {
    const notificationRepository = new NotificationInMemoryRepository();
    const unreadNotificationUseCase = new UnreadNotificationUseCase(notificationRepository);

    expect(() => {
      return unreadNotificationUseCase.execute({ id: 'non-existent-notification-id' });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
