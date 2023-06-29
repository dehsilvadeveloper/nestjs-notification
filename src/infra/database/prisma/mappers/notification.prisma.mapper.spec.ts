import { randomUUID } from 'node:crypto';
import { NotificationPrismaMapper } from './notification.prisma.mapper';
import { Category } from '@core/value-objects/notification/category';
import { Content } from '@core/value-objects/notification/content';
import { NotificationCategoryEnum } from '@shared/enums/notification-category.enum';
import { NotificationEntity } from '@core/entities/notification/notification.entity';

describe('Mapper NotificationPrismaMapper', () => {
  it('should map to Prisma', () => {
    const notificationEntity = new NotificationEntity({
      content: new Content('You received a friendship solicitation.'),
      category: new Category(NotificationCategoryEnum.social),
      recipientId: 'example-recipient-id',
    });

    const notificationPrismaData = NotificationPrismaMapper.toPrisma(notificationEntity);

    expect(typeof notificationPrismaData).toBe('object');
    expect(notificationPrismaData).toHaveProperty('content');
    expect(notificationPrismaData).toHaveProperty('category');
    expect(notificationPrismaData).toHaveProperty('recipientId');
    expect(notificationPrismaData.content).toEqual(notificationEntity.content.value);
    expect(notificationPrismaData.category).toEqual(notificationEntity.category.value);
    expect(notificationPrismaData.recipientId).toEqual(notificationEntity.recipientId);
  });

  it('should map to Domain', () => {
    const notificationPrismaData = {
      id: randomUUID(),
      content: 'You received a friendship solicitation.',
      category: NotificationCategoryEnum.social,
      recipientId: 'example-recipient-id',
      createdAt: new Date(),
      readAt: null,
      canceledAt: null,
    };

    const notificationEntity = NotificationPrismaMapper.toDomain(notificationPrismaData);

    expect(typeof notificationEntity).toBe('object');
    expect(notificationEntity).toBeInstanceOf(NotificationEntity);
    expect(notificationEntity).toHaveProperty('id');
    expect(notificationEntity).toHaveProperty('content');
    expect(notificationEntity).toHaveProperty('category');
    expect(notificationEntity).toHaveProperty('recipientId');
    expect(notificationEntity).toHaveProperty('createdAt');
    expect(notificationEntity).toHaveProperty('readAt');
    expect(notificationEntity).toHaveProperty('canceledAt');
    expect(notificationEntity.id).toEqual(notificationPrismaData.id);
    expect(notificationEntity.content.value).toEqual(notificationPrismaData.content);
    expect(notificationEntity.category.value).toEqual(notificationPrismaData.category);
    expect(notificationEntity.recipientId).toEqual(notificationPrismaData.recipientId);
    expect(notificationEntity.createdAt).toEqual(notificationPrismaData.createdAt);
    expect(notificationEntity.readAt).toEqual(notificationPrismaData.readAt);
    expect(notificationEntity.canceledAt).toEqual(notificationPrismaData.canceledAt);
  });
});
