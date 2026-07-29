import { NextHandler, Proxy } from '@Libs/proxy-container';
import { NextRequest } from 'next/server';

/**
 * loggerProxy
 *
 * 요청 URL, 메서드, 시간 등을 콘솔에 출력하는 기본 로깅 미들웨어
 */
const loggerProxyHandler: Proxy = async (req: NextRequest, next: NextHandler) => {
  console.info(`[Logger] ${req.method} ${req.nextUrl.pathname} @ ${new Date().toISOString()}`);
  return next(req);
};

export default loggerProxyHandler;
