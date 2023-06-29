import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { randomUUID } from 'node:crypto';
import { NotificationCategoryEnum } from '@shared/enums/notification-category.enum';
import { CreateNotificationDto } from './create-notification.dto';

describe('DTO CreateNotificationDto', () => {
  it('should create', async () => {
    const receivedData = {
      content: 'You received a friendship solicitation.',
      category: NotificationCategoryEnum.social,
      recipientId: randomUUID(),
    };
    const dto = plainToInstance(CreateNotificationDto, receivedData);

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });

  it('should not create using content without characters', async () => {
    const receivedData = {
      content: '',
      category: NotificationCategoryEnum.social,
      recipientId: randomUUID(),
    };
    const dto = plainToInstance(CreateNotificationDto, receivedData);

    const errors = await validate(dto);
    const stringifiedErrors = JSON.stringify(errors);

    expect(errors.length).not.toBe(0);
    expect(stringifiedErrors).toContain('content must be longer than or equal to 3 characters');
    expect(stringifiedErrors).toContain('content should not be empty');
  });

  it('should not create using content with less than 3 characters', async () => {
    const receivedData = {
      content: 'a',
      category: NotificationCategoryEnum.social,
      recipientId: randomUUID(),
    };
    const dto = plainToInstance(CreateNotificationDto, receivedData);

    const errors = await validate(dto);
    const stringifiedErrors = JSON.stringify(errors);

    expect(errors.length).not.toBe(0);
    expect(stringifiedErrors).toContain('content must be longer than or equal to 3 characters');
  });

  it('should not create using category with invalid name', async () => {
    const receivedData = {
      content: 'You received a friendship solicitation.',
      category: 'soccer',
      recipientId: randomUUID(),
    };
    const dto = plainToInstance(CreateNotificationDto, receivedData);

    const errors = await validate(dto);
    const stringifiedErrors = JSON.stringify(errors);

    const validCategories = Object.values(NotificationCategoryEnum);

    expect(errors.length).not.toBe(0);
    expect(stringifiedErrors).toContain(
      `category must be one of the following values: ${validCategories.join(', ')}`,
    );
  });

  it('should not create using recipientId with invalid UUID', async () => {
    const receivedData = {
      content: 'You received a friendship solicitation.',
      category: NotificationCategoryEnum.social,
      recipientId: 'invalid-uuid',
    };
    const dto = plainToInstance(CreateNotificationDto, receivedData);

    const errors = await validate(dto);
    const stringifiedErrors = JSON.stringify(errors);

    expect(errors.length).not.toBe(0);
    expect(stringifiedErrors).toContain('recipientId must be a UUID');
  });
});
