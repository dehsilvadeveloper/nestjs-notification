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
}
