import { NextRequest, NextResponse } from 'next/server';
import { Middleware } from '../middleware-type';

export interface MiddlewareContainer {
  use(name: string, middleware: Middleware): this;

  compose(chainName: string, middlewareNames: string[]): this;

  resolve(chainName: string): {
    execute(request: NextRequest): Promise<NextResponse>;
  };
}
