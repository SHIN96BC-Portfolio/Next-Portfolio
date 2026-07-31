'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

/**
 * Next Auth Provider
 * @param session
 * @param {React.ReactNode} children
 * @returns {React.ReactNode}
 * @constructor
 */
export default function NextAuthProvider({
  session,
  children,
}: {
  session: Session | null;
  children: ReactNode;
}): ReactNode {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
