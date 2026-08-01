import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Social',
  description: 'Social app scaffold',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
