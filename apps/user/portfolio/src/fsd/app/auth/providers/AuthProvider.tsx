'use client';

import { serviceContainer } from '@FsdShared/config/service/service.setup';
import { useSession } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';

/**
 * Auth Provider
 * @param {React.ReactNode} children
 * @returns {React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | Iterable<React.ReactNode> | React.ReactPortal | Promise<AwaitedReactNode> | bigint | undefined | null | boolean}
 * @constructor
 */
export default function AuthProvider({ children }: { children: ReactNode }) {
  const session = useSession();

  useEffect(() => {
    if (session && session.data && session.data.accessToken) {
      serviceContainer.setToken(session.data.accessToken);
    } else {
      serviceContainer.clearToken();
    }
  }, [session]);

  return children;
}
