import { NextRequest, NextResponse } from 'next/server';

export type ProxyChainOption = {
  /**
   * exact: 정확히 매칭되는지 체크
   * endsWith: ~으로 끝나는지 체크
   * startsWith: ~으로 시작하는지 체크
   * includes: ~으로 포함하는지 체크
   */
  matchType: 'exact' | 'endsWith' | 'startsWith' | 'includes';
};

export type ProxyChainValue = {
  values: string[];
  options?: ProxyChainOption;
};
export type NextHandler = (req: NextRequest) => Promise<NextResponse>;
export type Proxy = (request: NextRequest, next: NextHandler) => Promise<NextResponse>;

export default undefined;
