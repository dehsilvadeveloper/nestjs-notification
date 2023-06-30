import { NotificationInMemoryRepository } from '@infra/database/in-memory/repositories/notification.in-memory.repository';
import { ListNotificationUseCase } from './list-notification.use-case';
import { makeNotification } from '@test/factories/notification.factory';

describe('Usecase ListNotificationUseCase', () => {
  it('should get notifications', async () => {
    const notificationRepository = new NotificationInMemoryRepository();
    const listNotificationUseCase = new ListNotificationUseCase(notificationRepository);

    await notificationRepository.create(makeNotification({ recipientId: 'user-123' }));
    await notificationRepository.create(makeNotification({ recipientId: 'user-123' }));
    await notificationRepository.create(makeNotification({ recipientId: 'user-789' }));

    const { notifications } = await listNotificationUseCase.execute();

    expect(notifications.length).toBe(3);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'user-123' }),
        expect.objectContaining({ recipientId: 'user-123' }),
        expect.objectContaining({ recipientId: 'user-789' }),
      ]),
    );
  });

  it('should get a empty list if does not exists notifications', async () => {
    const notificationRepository = new NotificationInMemoryRepository();
    const listNotificationUseCase = new ListNotificationUseCase(notificationRepository);

    const { notifications } = await listNotificationUseCase.execute();

    expect(notifications.length).toBe(0);
  });
});
