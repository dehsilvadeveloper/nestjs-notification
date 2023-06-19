import { NotificationEntity } from './notification.entity';
import { Category } from '@core/value-objects/notification/category';
import { Content } from '@core/value-objects/notification/content';
import { NotificationCategoryEnum } from '@shared/enums/notification-category.enum';

describe('Entity NotificationEntity', () => {
  it('should create', () => {
    const notification = new NotificationEntity({
      content: new Content('You received a friendship solicitation.'),
      category: new Category(NotificationCategoryEnum.social),
      recipientId: 'example-recipient-id',
    });

    expect(notification).toBeTruthy();
  });
});
