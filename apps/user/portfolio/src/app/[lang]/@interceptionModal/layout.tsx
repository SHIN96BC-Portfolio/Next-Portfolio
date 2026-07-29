import GuestGuard from '@FsdApp/auth/guards/GuestGuard';
import { ReactNode } from 'react';

export default function AuthModalLayout({ children }: { children: ReactNode }) {
  return <GuestGuard>{children}</GuestGuard>;
}
