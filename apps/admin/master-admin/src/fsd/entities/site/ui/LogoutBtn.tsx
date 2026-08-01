'use client';

import { signOut } from 'next-auth/react';
import { useCallback } from 'react';

export default function LogoutBtn() {
  const handleLogout = useCallback(() => {
    signOut({ redirect: true, callbackUrl: '/' });
  }, []);

  return (
    <button type="button" onClick={handleLogout}>
      Logout
    </button>
  );
}
