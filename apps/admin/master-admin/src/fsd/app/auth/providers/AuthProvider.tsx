'use client';

import { serviceContainer } from '@FsdShared/libs/services';
import { useSession } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';

/**
 * Auth Provider
 */
export default function AuthProvider({ children }: { children: ReactNode }) {
  const session = useSession();

  useEffect(() => {
    if (session.data?.accessToken) {
      serviceContainer.setToken(session.data.accessToken);
      return;
    }

    serviceContainer.clearToken();
  }, [session]);

  return children;
}
