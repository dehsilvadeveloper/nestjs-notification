import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { NotificationEntity } from '@core/entities/notification/notification.entity';
import { NotificationRepositoryInterface } from '@core/repositories-interfaces/notification.repository.interface';
import { NotificationPrismaMapper } from '@infra/database/prisma/mappers/notification.prisma.mapper';

@Injectable()
export class NotificationPrismaRepository implements NotificationRepositoryInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async create(notification: NotificationEntity): Promise<void> {
    const notificationPrismaData = NotificationPrismaMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data: notificationPrismaData,
    });
  }

  async save(notification: NotificationEntity): Promise<void> {
    const notificationPrismaData = NotificationPrismaMapper.toPrisma(notification);

    await this.prismaService.notification.update({
      where: { id: notification.id },
      data: notificationPrismaData,
    });
  }

  async findById(id: string): Promise<NotificationEntity | null> {
    const notificationPrismaData = await this.prismaService.notification.findUnique({
      where: { id },
    });

    if (!notificationPrismaData) {
      return null;
    }

    const notification = NotificationPrismaMapper.toDomain(notificationPrismaData);

    return notification;
  }
}
