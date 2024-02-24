/* eslint-disable @typescript-eslint/no-explicit-any */
interface ICacheProvider {
  save(key: string, value: any, expire_seconds?: number): Promise<void>;
  recover<T>(key: string): Promise<T | null>;
  invalidate(key: string): Promise<void>;
  invalidatePrefix(prefix: string): Promise<void>;
}

export { ICacheProvider };
