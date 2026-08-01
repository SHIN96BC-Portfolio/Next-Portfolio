import { NextRequest, NextResponse } from 'next/server';

export default interface MiddlewareChain {
  execute: (req: NextRequest) => Promise<NextResponse>;
}
