import { ContentEntity } from './content.entity';
import { NotificationEntity } from './notification.entity';

describe('Entity NotificationEntity', () => {
  it('should create', () => {
    const notification = new NotificationEntity({
      content: new ContentEntity('You received a friendship solicitation.'),
      category: 'social',
      recipientId: 'example-recipient-id',
    });

    expect(notification).toBeTruthy();
  });
});
