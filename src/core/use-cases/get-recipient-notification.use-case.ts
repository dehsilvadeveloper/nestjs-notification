import { Injectable } from '@nestjs/common';
import { NotificationEntity } from '@core/entities/notification/notification.entity';
import { NotificationRepositoryInterface } from '@core/repositories-interfaces/notification.repository.interface';

export interface GetRecipientNotificationRequest {
  recipientId: string;
}

export interface GetRecipientNotificationResponse {
  notifications: NotificationEntity[];
}

@Injectable()
export class GetRecipientNotificationUseCase {
  constructor(private readonly notificationRepository: NotificationRepositoryInterface) {}

  async execute(
    request: GetRecipientNotificationRequest,
  ): Promise<GetRecipientNotificationResponse> {
    const { recipientId } = request;

    const notifications = await this.notificationRepository.findManyByRecipientId(recipientId);

    return { notifications };
  }
}
