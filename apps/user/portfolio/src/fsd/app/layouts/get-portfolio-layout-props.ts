import { resolveContentLang } from '@FsdEntities/content/model/types';
import { SiteGnb } from '@FsdEntities/site/model/client/gnb';
import { I18N_DICTIONARY_NAMESPACE, Locale } from '@FsdShared/config/i18n';
import { DictionaryHome } from '@FsdShared/config/i18n/auto-gen/types/home';
import getI18nTranslator from '@FsdShared/config/i18n/utils/get-i18n-translator';
import { ThemeType } from '@FsdShared/config/theme/model/type';
import getThemeCookie from '@FsdShared/config/theme/server-action/getThemeCookie';
import fetchGnbSSR from '@NextApp/_actions/fetchGnbSSR';

export interface PortfolioLayoutProps {
  themeType: ThemeType;
  homeDict: DictionaryHome;
  gnbList: SiteGnb[];
}

export async function getPortfolioLayoutProps(lang: string): Promise<PortfolioLayoutProps> {
  const contentLang = resolveContentLang(lang);
  const [themeType, { dict: homeDict }, gnbList] = await Promise.all([
    getThemeCookie(),
    getI18nTranslator(lang as Locale, I18N_DICTIONARY_NAMESPACE.HOME),
    fetchGnbSSR(contentLang),
  ]);

  return { themeType, homeDict, gnbList };
}
