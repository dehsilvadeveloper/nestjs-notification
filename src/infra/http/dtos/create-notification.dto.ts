import { IsNotEmpty, IsUUID, Length } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsUUID()
  recipientId: string;

  @IsNotEmpty()
  @Length(3)
  content: string;

  @IsNotEmpty()
  category: string;
}
