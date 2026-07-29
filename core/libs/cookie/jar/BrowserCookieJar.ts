import { CookieOptions } from '@Libs/cookie/cookie.types';
import CookieBaseJar from '@Libs/cookie/jar/abstract/CookieBaseJar';
import parseCookieHeader from '@Libs/cookie/utils/parseCookieHeader';
import serializeCookie from '@Libs/cookie/utils/serializeCookie';

/** 클라이언트 측 document.cookie 사용 */
export default class BrowserCookieJar extends CookieBaseJar {
  constructor(secretKey?: string) {
    super(secretKey);
  }

  get(name: string): string | undefined {
    if (typeof document === 'undefined') return undefined;
    const map = parseCookieHeader(document.cookie);
    const raw = map[name];
    if (!raw) return undefined;
    try {
      return this.decrypt(raw);
    } catch {
      return undefined;
    }
  }

  set(name: string, value: string, options?: CookieOptions): void {
    if (typeof document === 'undefined') return;
    const enc = this.encrypt(value);
    document.cookie = serializeCookie(name, enc, options);
  }

  remove(name: string, options?: CookieOptions): void {
    if (typeof document === 'undefined') return;
    document.cookie = serializeCookie(name, '', { ...options, maxAge: 0, expires: new Date(0) });
  }
}
