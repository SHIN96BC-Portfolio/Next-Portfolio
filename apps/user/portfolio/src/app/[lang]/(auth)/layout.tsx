import GuestGuard from '@FsdApp/auth/guards/GuestGuard';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <GuestGuard>{children}</GuestGuard>;
}
