import {
  NotificationEntityProps,
  NotificationEntity,
} from '@core/entities/notification/notification.entity';
import { Category } from '@core/value-objects/notification/category';
import { Content } from '@core/value-objects/notification/content';
import { NotificationCategoryEnum } from '@shared/enums/notification-category.enum';

type Override = Partial<NotificationEntityProps>;

export function makeNotification(override: Override = {}) {
  return new NotificationEntity({
    content: new Content('You received a friendship solicitation.'),
    category: new Category(NotificationCategoryEnum.social),
    recipientId: 'example-recipient-id',
    ...override,
  });
}
