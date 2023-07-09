import { Injectable } from '@nestjs/common';
import { NotificationRepositoryInterface } from '@core/repositories-interfaces/notification.repository.interface';

export interface CountRecipientNotificationUseCaseRequest {
  recipientId: string;
}

export interface CountRecipientNotificationUseCaseResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotificationUseCase {
  constructor(private readonly notificationRepository: NotificationRepositoryInterface) {}

  async execute(
    request: CountRecipientNotificationUseCaseRequest,
  ): Promise<CountRecipientNotificationUseCaseResponse> {
    const { recipientId } = request;

    const count = await this.notificationRepository.countByRecipientId(recipientId);

    return { count };
  }
}
