import { registerAs } from '@nestjs/config';

export default registerAs('apiConfig', () => ({
  name: process.env.API_NAME || 'api',
  defaultVersion: process.env.API_DEFAULT_VERSION || '1',
}));
