import { NotificationInMemoryRepository } from '@infra/database/in-memory/repositories/notification.in-memory.repository';
import { CancelNotificationUseCase } from './cancel-notification.use-case';
import { makeNotification } from '@test/factories/notification.factory';
import { NotificationNotFoundError } from '../errors/notification-not-found.error';

describe('Usecase CancelNotificationUseCase', () => {
  it('should cancel a notification', async () => {
    const notificationRepository = new NotificationInMemoryRepository();
    const cancelNotificationUseCase = new CancelNotificationUseCase(notificationRepository);

    const newNotification = makeNotification({ recipientId: 'user-123' });
    await notificationRepository.create(newNotification);

    await cancelNotificationUseCase.execute({ id: newNotification.id });

    const canceledNotification = await notificationRepository.findById(newNotification.id);

    expect(canceledNotification?.canceledAt).toBeInstanceOf(Date);
  });

  it('should not cancel a non existing notification', async () => {
    const notificationRepository = new NotificationInMemoryRepository();
    const cancelNotificationUseCase = new CancelNotificationUseCase(notificationRepository);

    expect(() => {
      return cancelNotificationUseCase.execute({ id: 'non-existent-notification-id' });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
