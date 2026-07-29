import { cookies } from 'next/headers';

/** 쿠키 옵션(자주 쓰는 것만) */
export type CookieOptions = {
  maxAge?: number; // 초 단위 (브라우저 표준)
  expires?: Date; // maxAge 대신 사용 가능
  path?: string; // 기본 '/'
  domain?: string; // 다중 서브도메인 공유시 사용
  secure?: boolean; // https 환경에서 true 권장
  httpOnly?: boolean; // 클라이언트 JS 접근 불가(서버에서만)
  sameSite?: 'lax' | 'strict' | 'none';
};

/** 내부 TTL 페이로드 (옵션) */
export type WithTTL<T> = { v: T; exp: number };

export type NextCookieStore = Awaited<ReturnType<typeof cookies>>;
