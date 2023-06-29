import { Injectable } from '@nestjs/common';
import { NotificationRepositoryInterface } from '@core/repositories-interfaces/notification.repository.interface';
import { NotificationNotFoundError } from '../errors/notification-not-found.error';

export interface CancelNotificationUseCaseRequest {
  id: string;
}

@Injectable()
export class CancelNotificationUseCase {
  constructor(private readonly notificationsRepository: NotificationRepositoryInterface) {}

  async execute(request: CancelNotificationUseCaseRequest): Promise<void> {
    const { id } = request;

    const notification = await this.notificationsRepository.findById(id);

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.cancel();

    await this.notificationsRepository.save(notification);
  }
}
