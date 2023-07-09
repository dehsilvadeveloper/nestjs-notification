import { Injectable } from '@nestjs/common';
import { NotificationRepositoryInterface } from '@core/repositories-interfaces/notification.repository.interface';
import { NotificationNotFoundError } from '../errors/notification-not-found.error';

export interface ReadNotificationUseCaseRequest {
  id: string;
}

@Injectable()
export class ReadNotificationUseCase {
  constructor(private readonly notificationRepository: NotificationRepositoryInterface) {}

  async execute(request: ReadNotificationUseCaseRequest): Promise<void> {
    const { id } = request;

    const notification = await this.notificationRepository.findById(id);

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.read();

    await this.notificationRepository.save(notification);
  }
}
