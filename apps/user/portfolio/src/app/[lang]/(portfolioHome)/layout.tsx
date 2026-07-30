import HomeLayout from '@FsdApp/layouts/HomeLayout';
import { I18N_DICTIONARY_NAMESPACE, Locale } from '@FsdShared/config/i18n';
import getI18nTranslator from '@FsdShared/config/i18n/utils/get-i18n-translator';
import getThemeCookie from '@FsdShared/config/theme/server-action/getThemeCookie';

interface Props {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function HomePageLayout({ children, params }: Props) {
  const [{ lang }, theme] = await Promise.all([params, getThemeCookie()]);
  const { dict: homeDict } = await getI18nTranslator(lang as Locale, I18N_DICTIONARY_NAMESPACE.HOME);

  return (
    <HomeLayout themeType={theme} homeDict={homeDict}>
      {children}
    </HomeLayout>
  );
}
