import { NotificationInMemoryRepository } from '@infra/database/in-memory/repositories/notification.in-memory.repository';
import { GetRecipientNotificationUseCase } from './get-recipient-notification.use-case';
import { makeNotification } from '../../../test/factories/notification.factory';

describe('Usecase GetRecipientNotificationUseCase', () => {
  it('should get notifications of specific recipient', async () => {
    const notificationRepository = new NotificationInMemoryRepository();
    const getRecipientNotificationUseCase = new GetRecipientNotificationUseCase(
      notificationRepository,
    );

    await notificationRepository.create(makeNotification({ recipientId: 'user-123' }));
    await notificationRepository.create(makeNotification({ recipientId: 'user-123' }));
    await notificationRepository.create(makeNotification({ recipientId: 'user-789' }));

    const { notifications } = await getRecipientNotificationUseCase.execute({
      recipientId: 'user-123',
    });

    expect(notifications.length).toBe(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'user-123' }),
        expect.objectContaining({ recipientId: 'user-123' }),
      ]),
    );
  });

  it('should get a empty list if a specific recipient does not have notifications', async () => {
    const notificationRepository = new NotificationInMemoryRepository();
    const getRecipientNotificationUseCase = new GetRecipientNotificationUseCase(
      notificationRepository,
    );

    const { notifications } = await getRecipientNotificationUseCase.execute({
      recipientId: 'user-123',
    });

    expect(notifications.length).toBe(0);
  });
});
