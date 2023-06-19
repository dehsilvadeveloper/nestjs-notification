import { IsNotEmpty, IsUUID, Length, IsEnum } from 'class-validator';
import { NotificationCategoryEnum } from '@shared/enums/notification-category.enum';

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsUUID()
  recipientId: string;

  @IsNotEmpty()
  @Length(3)
  content: string;

  @IsNotEmpty()
  @IsEnum(NotificationCategoryEnum)
  category: string;
}
