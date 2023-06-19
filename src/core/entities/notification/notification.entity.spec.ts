import { NotificationEntity } from './notification.entity';
import { Content } from '@core/value-objects/notification/content';

describe('Entity NotificationEntity', () => {
  it('should create', () => {
    const notification = new NotificationEntity({
      content: new Content('You received a friendship solicitation.'),
      category: 'social',
      recipientId: 'example-recipient-id',
    });

    expect(notification).toBeTruthy();
  });
});
