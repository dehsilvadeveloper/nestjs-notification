import { Injectable } from '@nestjs/common';
import { NotificationRepositoryInterface } from '@core/repositories-interfaces/notification.repository.interface';
import { NotificationNotFoundError } from '../errors/notification-not-found.error';

export interface UnreadNotificationUseCaseRequest {
  id: string;
}

@Injectable()
export class UnreadNotificationUseCase {
  constructor(private readonly notificationRepository: NotificationRepositoryInterface) {}

  async execute(request: UnreadNotificationUseCaseRequest): Promise<void> {
    const { id } = request;

    const notification = await this.notificationRepository.findById(id);

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.unread();

    await this.notificationRepository.save(notification);
  }
}
