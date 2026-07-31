import { NextRequest, NextResponse } from 'next/server';

export type NextHandler = (req: NextRequest) => Promise<NextResponse>;
export type Middleware = (request: NextRequest, next: NextHandler) => Promise<NextResponse>;

export default undefined;
