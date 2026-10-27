import InterceptionModalLoginPage from '@FsdPages/interception-modal/login/InterceptionModalLoginPage';
import { resolveLocale } from '@FsdShared/config/i18n/constants/resolve-locale';

type PageProps = {
  params: Promise<{ lang: string }>;
};

export default async function Page({ params }: PageProps) {
  const { lang } = await params;

  return <InterceptionModalLoginPage lang={resolveLocale(lang)} />;
}
