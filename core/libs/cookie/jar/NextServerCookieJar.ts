import { CookieOptions, NextCookieStore } from '@Libs/cookie/cookie.types';
import CookieBaseJar from '@Libs/cookie/jar/abstract/CookieBaseJar';
import { cookies } from 'next/headers';

/** Next App Router 서버 사이드용: next/headers의 cookies() 래핑 */
class NextServerCookieJar extends CookieBaseJar {
  private readonly store: NextCookieStore;

  constructor(store: NextCookieStore, secretKey?: string) {
    super(secretKey);
    this.store = store;
  }

  get(name: string): string | undefined {
    const raw = this.store.get(name)?.value;
    if (!raw) return undefined;
    try {
      return this.decrypt(raw);
    } catch {
      return undefined;
    }
  }

  set(name: string, value: string, options?: CookieOptions): void {
    const enc = this.encrypt(value);
    this.store.set({ name, value: enc, ...options });
  }

  remove(name: string, options?: CookieOptions): void {
    this.store.delete(name);
    this.store.set({ name, value: '', ...options, maxAge: 0, expires: new Date(0) });
  }
}

/** 팩토리 함수로 생성 */
export default async function makeNextServerCookieJar(secretKey?: string) {
  const store = await cookies();
  return new NextServerCookieJar(store, secretKey);
}
