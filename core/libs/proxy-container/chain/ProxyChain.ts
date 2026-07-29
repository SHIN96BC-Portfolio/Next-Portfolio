import { NextRequest, NextResponse } from 'next/server';

export default interface ProxyChain {
  execute: (req: NextRequest) => Promise<NextResponse>;
}
