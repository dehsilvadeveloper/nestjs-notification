import { NotificationInMemoryRepository } from '../../infra/database/in-memory/repositories/notification.in-memory.repository';
import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
} from './send-notification.use-case';

describe('Usecase SendNotificationUseCase', () => {
  it('should create', async () => {
    const notificationRepository = new NotificationInMemoryRepository();
    const sendNotificationUseCase = new SendNotificationUseCase(notificationRepository);

    const request: SendNotificationUseCaseRequest = {
      content: 'This is a notification',
      category: 'social',
      recipientId: 'example-recipient-id',
    };

    const response = await sendNotificationUseCase.execute(request);

    expect(response).toBeTruthy();
    expect(response.notification.recipientId).toEqual(request.recipientId);
    expect(response.notification.content.value).toEqual(request.content);
    expect(response.notification.category.value).toEqual(request.category);
    expect(response.notification.createdAt).toBeInstanceOf(Date);
  });
});
