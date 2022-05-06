import { CacheModule, Global, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';
import { CacheService } from './cache.service';

@Global()
@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      ttl: 3600,
      isGlobal: true,
      store: redisStore,
      password: process.env.REDIS_PASS,
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT || 6379}`,
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class BaseCacheModule {}
