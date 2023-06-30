import { NotificationInMemoryRepository } from '@infra/database/in-memory/repositories/notification.in-memory.repository';
import { ReadNotificationUseCase } from './read-notification.use-case';
import { makeNotification } from '@test/factories/notification.factory';
import { NotificationNotFoundError } from '../errors/notification-not-found.error';

describe('Usecase ReadNotificationUseCase', () => {
  it('should read a notification', async () => {
    const notificationRepository = new NotificationInMemoryRepository();
    const readNotificationUseCase = new ReadNotificationUseCase(notificationRepository);

    const newNotification = makeNotification({ recipientId: 'user-123' });
    await notificationRepository.create(newNotification);

    await readNotificationUseCase.execute({ id: newNotification.id });

    const readNotification = await notificationRepository.findById(newNotification.id);

    expect(readNotification?.readAt).toBeInstanceOf(Date);
  });

  it('should not read a non existing notification', async () => {
    const notificationRepository = new NotificationInMemoryRepository();
    const readNotificationUseCase = new ReadNotificationUseCase(notificationRepository);

    expect(() => {
      return readNotificationUseCase.execute({ id: 'non-existent-notification-id' });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
