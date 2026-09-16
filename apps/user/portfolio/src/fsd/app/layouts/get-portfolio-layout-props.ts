import { SiteGnb } from '@FsdEntities/site/model/client/gnb';
import { I18N_DICTIONARY_NAMESPACE } from '@FsdShared/config/i18n';
import { DictionaryHome } from '@FsdShared/config/i18n/auto-gen/types/home';
import { resolveLocale } from '@FsdShared/config/i18n/constants/resolve-locale';
import getI18nTranslator from '@FsdShared/config/i18n/utils/get-i18n-translator';
import { ThemeType } from '@FsdShared/config/theme/model/theme';
import getThemeCookie from '@FsdShared/config/theme/server-action/get-theme-cookie';
import fetchGnbSSR from '@NextApp/_actions/fetchGnbSSR';

export interface PortfolioLayoutProps {
  themeType: ThemeType;
  homeDict: DictionaryHome;
  gnbList: SiteGnb[];
}

export async function getPortfolioLayoutProps(lang: string): Promise<PortfolioLayoutProps> {
  const locale = resolveLocale(lang);
  const [themeType, { dict: homeDict }, gnbList] = await Promise.all([
    getThemeCookie(),
    getI18nTranslator(locale, I18N_DICTIONARY_NAMESPACE.HOME),
    fetchGnbSSR(locale),
  ]);

  return { themeType, homeDict, gnbList };
}
