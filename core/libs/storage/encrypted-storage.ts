import { aesDecrypt, aesEncrypt } from '@Libs/crypto';
import { StorageLike } from '@Libs/storage/storage.type';

/**
 * AES 기반 암호화 Storage 유틸리티.
 *
 * - 생성자에서 **암호화 키를 주입**받아 사용합니다.
 * - 동일한 키로 여러 인스턴스를 생성할 수 있습니다.
 * - 기본 저장소는 `window.localStorage`이며, 필요 시 `StorageLike`를 주입하여 대체할 수 있습니다.
 *
 * @example
 * ```ts
 * const store = new EncryptedStorage(process.env.NEXT_PUBLIC_CRYPTO_SECRET_KEY!);
 * store.set('user', { id: 1, name: '병철' });
 * const user = store.get<{ id: number; name: string }>('user');
 * ```
 */
export default class EncryptedStorage {
  /** AES 비밀키(16/24/32 bytes 권장) */
  private readonly secretKey: string;
  /** 실제로 읽고/쓰기를 수행할 스토리지 구현체 */
  private readonly storage: StorageLike;

  /**
   * @param secretKey AES 암호화 키(UTF-8 기준 16/24/32 바이트 권장). 빈 문자열은 허용되지 않습니다.
   * @param storage 주입 가능한 스토리지 구현체. 기본값은 브라우저 환경의 `localStorage` 입니다.
   * @throws {Error} 비밀키가 제공되지 않은 경우
   */
  constructor(secretKey: string, storage?: StorageLike) {
    if (!secretKey) throw new Error('EncryptedStorage: secret key is required.');

    // 키 길이(바이트) 점검: 16/24/32바이트(AES-128/192/256) 권장
    const len = new TextEncoder().encode(secretKey).length;
    if (![16, 24, 32].includes(len)) {
      console.error(`[EncryptedLocalStorage] AES key length = ${len} bytes (expected 16/24/32)`);
    }

    this.secretKey = secretKey;
    // 기본은 localStorage. SSR에서는 빈 객체로 대체.
    this.storage = storage ? storage : typeof window !== 'undefined' ? window.localStorage : ({} as StorageLike);
  }

  /**
   * 값을 암호화하여 스토리지에 저장합니다.
   *
   * - `value`는 내부에서 `JSON.stringify`로 직렬화됩니다.
   * - AES-CBC(PKCS7)로 암호화되며, 저장 값은 Base64 문자열입니다.
   *
   * @param key 저장 키
   * @param value 저장할 값(직렬화 가능한 값)
   * @returns 반환값 없음
   */
  set(key: string, value: unknown): void {
    if (typeof window === 'undefined') return; // SSR 방어
    if (typeof value === 'undefined') return;

    try {
      const json = JSON.stringify(value);
      const encrypted = aesEncrypt(json, this.secretKey, {
        keyEncoding: 'utf8',
        output: 'base64',
      });
      this.storage.setItem(key, encrypted);
    } catch (err) {
      console.error(`[EncryptedStorage.set] encrypt failed: ${key}`, err);
    }
  }

  /**
   * 스토리지에서 값을 읽어 **복호화 후 파싱**하여 반환합니다.
   *
   * - 존재하지 않거나 복호화/파싱에 실패하면 `undefined`를 반환합니다.
   *
   * @typeParam T 기대하는 반환 타입
   * @param key 저장 키
   * @returns 복호화/파싱된 값 또는 `undefined`
   */
  get<T = unknown>(key: string): T | undefined {
    if (typeof window === 'undefined') return undefined;

    try {
      const encrypted = this.storage.getItem(key);
      if (!encrypted) return undefined;

      const decrypted = aesDecrypt(encrypted, this.secretKey, {
        keyEncoding: 'utf8',
        input: 'base64',
      });

      // 비JSON 원문을 저장했다면 여기서 파싱 에러가 발생할 수 있음
      return JSON.parse(decrypted) as T;
    } catch (err) {
      console.error(`[EncryptedStorage.get] decrypt failed: ${key}`, err);
      return undefined;
    }
  }

  /**
   * 해당 키가 스토리지에 **존재하는지 여부**를 반환합니다.
   *
   * @param key 확인할 키
   * @returns 존재하면 `true`, 아니면 `false`
   */
  has(key: string): boolean {
    if (typeof window === 'undefined') return false;
    return !!this.storage.getItem(key);
  }

  /**
   * TTL(만료시간)을 포함하여 값을 저장합니다.
   *
   * - 내부적으로 `{ v: value, exp: number }` 구조로 래핑하여 저장합니다.
   * - `getWithTTL`로 읽을 때 현재 시간이 `exp`를 지나면 값을 제거하고 `undefined`를 반환합니다.
   *
   * @param key 저장 키
   * @param value 저장할 값
   * @param ttlMs 만료 시간(ms)
   */
  setWithTTL(key: string, value: unknown, ttlMs: number): void {
    const payload = { v: value, exp: Date.now() + ttlMs };
    this.set(key, payload);
  }

  /**
   * TTL 로 저장된 값을 읽습니다.
   *
   * - 만료(expired)된 경우 해당 키를 제거하고 `undefined`를 반환합니다.
   *
   * @typeParam T 기대하는 반환 타입
   * @param key 저장 키
   * @returns 유효한 값 또는 `undefined`
   */
  getWithTTL<T>(key: string): T | undefined {
    const payload = this.get<{ v: T; exp: number }>(key);
    if (!payload) return undefined;

    if (Date.now() > payload.exp) {
      this.remove(key);
      return undefined;
    }
    return payload.v;
  }

  /**
   * 특정 키를 **삭제**합니다.
   *
   * @param key 삭제할 키
   * @returns 반환값 없음
   */
  remove(key: string): void {
    if (typeof window === 'undefined') return;
    this.storage.removeItem(key);
  }

  /**
   * 스토리지의 **모든 항목을 삭제**합니다.
   *
   * @returns 반환값 없음
   */
  clear(): void {
    if (typeof window === 'undefined') return;
    this.storage.clear();
  }
}
