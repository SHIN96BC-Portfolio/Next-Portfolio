// libs/cookie/jar.ts
import type { CookieOptions, WithTTL } from '@Libs/cookie/cookie.types';
import { aesDecrypt, aesEncrypt } from '@Libs/crypto';

export default abstract class CookieBaseJar {
  protected readonly secretKey?: string;

  constructor(secretKey?: string) {
    this.secretKey = secretKey;
  }

  /** 하위 클래스가 구현 */
  abstract get(name: string): string | undefined;
  abstract set(name: string, value: string, options?: CookieOptions): void;
  abstract remove(name: string, options?: CookieOptions): void;

  /** 암호화 */
  protected encrypt(plain: string): string {
    if (!this.secretKey) return plain; // secretKey 없으면 암호화 비활성

    return aesEncrypt(plain, this.secretKey, {
      keyEncoding: 'utf8',
      output: 'base64',
    });
  }

  /** 복호화 */
  protected decrypt(cipher: string): string {
    if (!this.secretKey) return cipher; // secretKey 없으면 복호화 비활성

    return aesDecrypt(cipher, this.secretKey, {
      keyEncoding: 'utf8',
      input: 'base64',
    });
  }

  // 공통 JSON get/set
  setJSON(name: string, value: unknown, options?: CookieOptions) {
    this.set(name, JSON.stringify(value), options);
  }

  getJSON<T>(name: string): T | undefined {
    const s = this.get(name);
    if (!s) return undefined;
    try {
      return JSON.parse(s) as T;
    } catch {
      return undefined;
    }
  }

  // 공통 TTL
  setWithTTL(name: string, value: unknown, ttlMs: number, options?: CookieOptions) {
    const payload: WithTTL<unknown> = { v: value, exp: Date.now() + ttlMs };
    this.setJSON(name, payload, { ...options, maxAge: Math.ceil(ttlMs / 1000) });
  }

  getWithTTL<T>(name: string): T | undefined {
    const payload = this.getJSON<WithTTL<T>>(name);
    if (!payload) return undefined;
    if (Date.now() > payload.exp) {
      this.remove(name);
      return undefined;
    }
    return payload.v;
  }
}
