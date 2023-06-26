export class NotificationDto {
  id: string;
  content: string;
  category: string;
  createdAt: Date;
  readAt: Date | null | undefined;
  canceledAt: Date | null | undefined;
  recipientId: string;
}
