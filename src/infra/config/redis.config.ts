export const redisConfig = {
  host: process.env.REDIS_HOST || 'redis',
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
  password: process.env.REDIS_PASSWORD,
  database: process.env.REDIS_DATABASE || 1,
};
