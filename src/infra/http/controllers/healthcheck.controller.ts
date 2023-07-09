import { Response } from 'express';
import { Controller, Res, Get, HttpStatus } from '@nestjs/common';

@Controller('healthcheck')
export class HealthCheckController {
  @Get()
  healthCheck(@Res() response: Response) {
    response.status(HttpStatus.OK).send('OK');
  }
}
