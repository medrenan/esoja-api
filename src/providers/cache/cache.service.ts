import { CACHE_MANAGER, Global, Inject, Injectable } from '@nestjs/common';
import { Cache, CachingConfig } from 'cache-manager';

@Global()
@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get(key: string): Promise<any> {
    return this.cache.get(key);
  }

  async set(key: string, value: any, options?: CachingConfig): Promise<any> {
    return this.cache.set(key, value, options);
  }

  async delete(key: string) {
    return this.cache.del(key);
  }

  async reset() {
    return this.cache.reset();
  }
}
