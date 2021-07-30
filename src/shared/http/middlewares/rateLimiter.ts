import { Request, Response, NextFunction } from 'express';
import redis from 'redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';

import { AppError } from '@shared/errors/AppError';
import cacheConfig from '@config/cache';

export async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const redisClient = redis.createClient({
    host: cacheConfig.config.redis.host,
    port: cacheConfig.config.redis.port,
    password: cacheConfig.config.redis.password,
  });

  const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'ratelimit',
    points: 5,
    duration: 1,
  });

  try {
    await limiter.consume(request.ip);

    return next();
  } catch (error) {
    throw new AppError('Too many requests.', 429);
  }
}
