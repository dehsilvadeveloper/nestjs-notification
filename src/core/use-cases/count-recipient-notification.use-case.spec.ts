import { Category } from '@core/value-objects/notification/category';
import { Content } from '@core/value-objects/notification/content';
import { NotificationCategoryEnum } from '@shared/enums/notification-category.enum';
import { NotificationInMemoryRepository } from '@infra/database/in-memory/repositories/notification.in-memory.repository';
import { CountRecipientNotificationUseCase } from './count-recipient-notification.use-case';
import { makeNotification } from '../../../test/factories/notification.factory';

describe('Usecase CountRecipientNotificationUseCase', () => {
  it('should count notifications of a specific recipient', async () => {
    const notificationRepository = new NotificationInMemoryRepository();
    const countRecipientNotificationUseCase = new CountRecipientNotificationUseCase(
      notificationRepository,
    );

    await notificationRepository.create(makeNotification({ recipientId: 'user-123' }));

    await notificationRepository.create(
      makeNotification({
        content: new Content('You received a partnership solicitation.'),
        category: new Category(NotificationCategoryEnum.professional),
        recipientId: 'user-123',
      }),
    );

    await notificationRepository.create(
      makeNotification({
        content: new Content('You received a partnership solicitation.'),
        category: new Category(NotificationCategoryEnum.professional),
        recipientId: 'user-456',
      }),
    );

    const counterResult = await countRecipientNotificationUseCase.execute({
      recipientId: 'user-123',
    });

    expect(counterResult.count).toBe(2);
  });

  it('should return zero if a specific recipient does not have notifications', async () => {
    const notificationRepository = new NotificationInMemoryRepository();
    const countRecipientNotificationUseCase = new CountRecipientNotificationUseCase(
      notificationRepository,
    );

    const counterResult = await countRecipientNotificationUseCase.execute({
      recipientId: 'user-123',
    });

    expect(counterResult.count).toBe(0);
  });
});
