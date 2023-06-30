import { NotificationInMemoryRepository } from '@infra/database/in-memory/repositories/notification.in-memory.repository';
import { GetNotificationUseCase } from './get-notification.use-case';
import { makeNotification } from '@test/factories/notification.factory';

describe('Usecase GetNotificationUseCase', () => {
  it('should get notification', async () => {
    const notificationRepository = new NotificationInMemoryRepository();
    const getNotificationUseCase = new GetNotificationUseCase(notificationRepository);

    const newNotification = makeNotification();
    await notificationRepository.create(newNotification);

    const response = await getNotificationUseCase.execute({
      id: newNotification.id,
    });

    expect(response).not.toBeNull();
    expect(response.notification?.recipientId).toEqual(newNotification.recipientId);
    expect(response.notification?.content.value).toEqual(newNotification.content.value);
    expect(response.notification?.category.value).toEqual(newNotification.category.value);
    expect(response.notification?.createdAt).toBeInstanceOf(Date);
  });

  it('should not get a non existing notification', async () => {
    const notificationRepository = new NotificationInMemoryRepository();
    const getNotificationUseCase = new GetNotificationUseCase(notificationRepository);

    const { notification } = await getNotificationUseCase.execute({
      id: 'example-recipient-id',
    });

    expect(notification).toBeNull();
  });
});
