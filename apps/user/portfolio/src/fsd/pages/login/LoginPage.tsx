import { LoginForm } from '@FsdFeatures/login/ui';
import { I18N_DICTIONARY_NAMESPACE } from '@FsdShared/config/i18n';
import type { Locale } from '@FsdShared/config/i18n/auto-gen/constants/i18n-locales';
import getI18nTranslator from '@FsdShared/config/i18n/utils/get-i18n-translator';

type LoginPageProps = {
  lang: Locale;
};

export default async function LoginPage({ lang }: LoginPageProps) {
  const { dict } = await getI18nTranslator(lang, I18N_DICTIONARY_NAMESPACE.COMMON);

  return (
    <div>
      <h1>{dict.login.title}</h1>
      <LoginForm />
    </div>
  );
}
