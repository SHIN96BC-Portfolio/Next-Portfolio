import { NextRequest, NextResponse } from 'next/server';
import { Middleware, NextHandler } from '../../middleware-type';

/**
 * 인증 토큰이 없으면 로그인 페이지로 리디렉션하고,
 * 있으면 다음 미들웨어로 진행
 */
const authMiddleHandler: Middleware = async (req: NextRequest, next: NextHandler) => {
  const token = req.cookies.get('auth_token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // 토큰이 존재하면 체인을 계속 실행
  return next(req);
};

export default authMiddleHandler;
