import MiddlewareChain from '@Src/shared/libs/middleware/chain/MiddlewareChain';
import { Middleware } from '@Src/shared/libs/middleware/middleware-type';
import { NextRequest, NextResponse } from 'next/server';

/**
 * 등록된 미들웨어 배열을 순차적으로 실행하는 체인 클래스
 */
export default class MiddlewareChainImpl implements MiddlewareChain {
  constructor(private chain: Middleware[]) {}

  /**
   * 미들웨어 체인을 실행하는 메서드
   * @param req - Next.js의 요청 객체
   * @returns 최종 NextResponse 객체
   */
  async execute(req: NextRequest): Promise<NextResponse> {
    /**
     * 내부 재귀 실행 함수
     * @param i - 현재 실행 중인 미들웨어 인덱스
     * @param r - 현재 요청 객체 (미들웨어가 수정 가능)
     */
    const run = async (i: number, r: NextRequest): Promise<NextResponse> => {
      // 모든 미들웨어를 실행한 경우 기본 응답 반환
      if (i >= this.chain.length) {
        return NextResponse.next();
      }

      // 현재 미들웨어 실행, next 콜백에 다음 미들웨어 실행 함수 넘김
      return this.chain[i](r, (nextReq: NextRequest) => run(i + 1, nextReq));
    };

    // 실행 시작
    return run(0, req);
  }
}
