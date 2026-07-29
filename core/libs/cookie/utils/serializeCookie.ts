import { CookieOptions } from '@Libs/cookie/cookie.types';

/** 쿠키 조립 유틸 */
export default function serializeCookie(name: string, value: string, opt: CookieOptions = {}) {
  const enc = encodeURIComponent;
  let str = `${enc(name)}=${enc(value)}`;
  if (opt.maxAge != null) str += `; Max-Age=${Math.floor(opt.maxAge)}`;
  if (opt.expires) str += `; Expires=${opt.expires.toUTCString()}`;
  str += `; Path=${opt.path || '/'}`;
  if (opt.domain) str += `; Domain=${opt.domain}`;
  if (opt.secure) str += `; Secure`;
  if (opt.httpOnly) str += `; HttpOnly`;
  if (opt.sameSite) str += `; SameSite=${opt.sameSite}`;
  return str;
}
