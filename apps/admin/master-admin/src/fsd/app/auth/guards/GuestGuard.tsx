'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';

export default function GuestGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session && session.data) {
      // if (typeof window !== 'undefined') {
      //   if (window.history.length > 1) {
      //     router.back();
      //   } else {
      //     router.replace('/');
      //   }
      // } else {
      //   router.replace('/');
      // }
      router.replace('/');
    }
  }, [session, router]);

  if (!session || !session.data) {
    return children;
  }

  return null;
}
