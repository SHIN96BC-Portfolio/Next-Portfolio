import { LoginForm } from '@FsdFeatures/login/ui';
import { I18N_DICTIONARY_NAMESPACE } from '@FsdShared/config/i18n';
import type { Locale } from '@FsdShared/config/i18n/auto-gen/constants/i18n-locales';
import getI18nTranslator from '@FsdShared/config/i18n/utils/get-i18n-translator';
import { InterceptionModal } from '@FsdShared/modal/ui';

type InterceptionModalLoginPageProps = {
  lang: Locale;
};

export default async function InterceptionModalLoginPage({ lang }: InterceptionModalLoginPageProps) {
  const { dict } = await getI18nTranslator(lang, I18N_DICTIONARY_NAMESPACE.COMMON);

  return (
    <InterceptionModal maxWidth={500} maxHeight={500}>
      <h1>{dict.login.title}</h1>
      <LoginForm isInterceptionPage />
    </InterceptionModal>
  );
}
