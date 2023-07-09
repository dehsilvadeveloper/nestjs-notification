import { Injectable } from '@nestjs/common';
import { NotificationEntity } from '@core/entities/notification/notification.entity';
import { NotificationRepositoryInterface } from '@core/repositories-interfaces/notification.repository.interface';

export interface ListNotificationResponse {
  notifications: NotificationEntity[];
}

@Injectable()
export class ListNotificationUseCase {
  constructor(private readonly notificationRepository: NotificationRepositoryInterface) {}

  async execute(): Promise<ListNotificationResponse> {
    const notifications = await this.notificationRepository.findAll();

    return { notifications };
  }
}
