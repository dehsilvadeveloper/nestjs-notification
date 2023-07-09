import { Response } from 'express';
import { Controller, Res, Get, HttpStatus } from '@nestjs/common';

@Controller({
  path: 'healthcheck',
  version: '1',
})
export class HealthCheckController {
  @Get()
  healthCheck(@Res() response: Response) {
    response.status(HttpStatus.OK).send('OK');
  }
}
