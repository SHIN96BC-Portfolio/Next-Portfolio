import LoginPage from '@FsdPages/login/LoginPage';
import { resolveLocale } from '@FsdShared/config/i18n/constants/resolve-locale';

type PageProps = {
  params: Promise<{ lang: string }>;
};

export default async function Page({ params }: PageProps) {
  const { lang } = await params;

  return <LoginPage lang={resolveLocale(lang)} />;
}
