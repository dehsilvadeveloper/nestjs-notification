import { NotificationEntity } from '@core/entities/notification/notification.entity';
import { Category } from '@core/value-objects/notification/category';
import { Content } from '@core/value-objects/notification/content';
import { NotificationCategoryEnum } from '@shared/enums/notification-category.enum';
import { NotificationInMemoryRepository } from '@infra/database/in-memory/repositories/notification.in-memory.repository';
import { CancelNotificationUseCase } from './cancel-notification.use-case';
import { NotificationNotFoundError } from '../errors/notification-not-found.error';

describe('Usecase CancelNotificationUseCase', () => {
  it('should cancel a notification', async () => {
    const notificationRepository = new NotificationInMemoryRepository();
    const cancelNotificationUseCase = new CancelNotificationUseCase(notificationRepository);

    const newNotification = new NotificationEntity({
      content: new Content('You received a friendship solicitation.'),
      category: new Category(NotificationCategoryEnum.social),
      recipientId: 'example-recipient-id',
    });
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
