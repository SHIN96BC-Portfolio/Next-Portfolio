import { makeNextServerCookieJar, ProxyCookieJar } from '@Libs/cookie';
import { NextRequest, NextResponse } from 'next/server';

/** 서버용 (public 과 다른 secret key 사용) */
export const createCustomNextServerCookie = () => makeNextServerCookieJar(process.env.PRIVATE_COOKIE_SECRET_KEY ?? '');

/** 미들웨어용 (public 과 다른 secret key 사용) */
export const createCustomProxyCookie = (store: NextRequest | NextResponse) =>
  new ProxyCookieJar(store, process.env.PRIVATE_COOKIE_SECRET_KEY ?? '');
