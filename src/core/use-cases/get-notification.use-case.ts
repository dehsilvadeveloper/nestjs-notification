import { Injectable } from '@nestjs/common';
import { NotificationEntity } from '@core/entities/notification/notification.entity';
import { NotificationRepositoryInterface } from '@core/repositories-interfaces/notification.repository.interface';

export interface GetNotificationRequest {
  id: string;
}

export interface GetNotificationResponse {
  notification: NotificationEntity | null;
}

@Injectable()
export class GetNotificationUseCase {
  constructor(private notificationRepository: NotificationRepositoryInterface) {}

  async execute(request: GetNotificationRequest): Promise<GetNotificationResponse> {
    const { id } = request;

    const notification = await this.notificationRepository.findById(id);

    return { notification };
  }
}
