import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fashion',
  description: 'Fashion app scaffold',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
