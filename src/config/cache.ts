interface ICacheRedis {
  host: string;
  port: number;
  password: string;
}

interface ICacheConfig {
  driver: 'redis';
  config: {
    redis: ICacheRedis;
  };
}

const configCache = {
  driver: 'redis',

  config: {
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASS || undefined,
    },
  },
} as ICacheConfig;

export { configCache };
