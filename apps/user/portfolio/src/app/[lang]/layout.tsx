import nextAuthOptions from '@FsdApp/auth/config/next-auth';
import AuthProvider from '@FsdApp/auth/providers/AuthProvider';
import NextAuthProvider from '@FsdApp/auth/providers/NextAuthProvider';
import I18nProvider from '@FsdApp/i18n/providers/I18nProvider';
import MockServerInit from '@FsdApp/mock/inits/MockServerInit';
import ReactQueryProvider from '@FsdApp/react-query/providers/ReactQueryProvider';
import StoreProvider from '@FsdApp/store/providers/StoreProvider';
import { Locale } from '@FsdShared/config/i18n';
import getThemeCookie from '@FsdShared/config/theme/server-action/getThemeCookie';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { getServerSession } from 'next-auth';
import '../globals.css';
import '@FsdShared/config/mock/mock-server.setup';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '신병철 | 5년차 Frontend Developer',
  description: 'Next.js 기반 프론트엔드 개발자 신병철의 포트폴리오',
};

export default async function LangLayout({
  children,
  params,
  interceptionModal,
}: Readonly<{
  children: React.ReactNode;
  // ts 컴파일 타임에는 lang 을 string 으로 받지 않으면 .next/types/validator.ts 에서 에러가 발생함
  params: Promise<{ lang: string }>;
  interceptionModal: React.ReactNode;
}>) {
  const session = await getServerSession(nextAuthOptions);
  const { lang } = await params;
  const theme = await getThemeCookie();

  return (
    <html lang={lang} className={theme === 'dark' ? 'dark' : ''} style={{ colorScheme: theme }}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <StoreProvider>
          <ReactQueryProvider>
            <NextAuthProvider session={session}>
              <AuthProvider>
                <MockServerInit>
                  {/* 미들웨어에서 Locale 이외의 값을 거르기 때문에 as 로 변환 */}
                  <I18nProvider locale={lang as Locale}>
                    {children}
                    {interceptionModal}
                  </I18nProvider>
                </MockServerInit>
              </AuthProvider>
            </NextAuthProvider>
          </ReactQueryProvider>
        </StoreProvider>
        <div id="modal-root" />
      </body>
    </html>
  );
}
