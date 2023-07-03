import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  NotFoundException,
  BadRequestException,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationNotFoundError } from '@core/errors/notification-not-found.error';

@Injectable()
export class NotificationNotFoundErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (error instanceof NotificationNotFoundError) {
          throw new NotFoundException(error.message);
        }

        throw new BadRequestException(error.message);
      }),
    );
  }
}
