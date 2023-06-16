import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { NotificationRepositoryInterface } from '@core/repositories-interfaces/notification.repository.interface';
import { NotificationPrismaRepository } from './prisma/repositories/notification.prisma.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationRepositoryInterface,
      useClass: NotificationPrismaRepository,
    },
  ],
  exports: [NotificationRepositoryInterface],
})
export class DatabaseModule {}
