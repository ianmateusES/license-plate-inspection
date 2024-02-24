/* eslint-disable @typescript-eslint/no-explicit-any */
import Redis, { Cluster, Redis as RedisClient, RedisOptions } from 'ioredis';

import { configCache } from '@config/cache';

import { ICacheProvider } from '../models/ICacheProvider';

class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient | Cluster;

  constructor() {
    const { host, port, password } = configCache.config.redis as RedisOptions;
    this.client = new Redis({
      host,
      port,
      password,
    });
  }

  public async save(
    key: string,
    value: any,
    expire_seconds?: number,
  ): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
    if (typeof expire_seconds === 'number') {
      await this.client.expire(key, expire_seconds);
    }
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);
    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public async invalidate(key: string): Promise<void> {
    this.client.del(key);
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = await this.client.keys(`${prefix}:*`);

    const pipeline = this.client.pipeline();

    keys.forEach((key: string) => {
      pipeline.del(key);
    });

    await pipeline.exec();
  }
}

export { RedisCacheProvider };
