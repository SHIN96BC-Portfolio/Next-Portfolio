import { SiteGnb } from '@FsdEntities/site/model/client/gnb';
import { HomeBtn, LoginBtn, LogoutBtn } from '@FsdEntities/site/ui';
import ThemeToggle from '@FsdEntities/theme/ui/ThemeToggle';
import { I18N_DICTIONARY_NAMESPACE } from '@FsdShared/config/i18n';
import getLangCookie from '@FsdShared/config/i18n/server-action/getLangCookie';
import { ThemeType } from '@FsdShared/config/theme/model/type';
import LangToggle from '../../../entities/lang/ui/LangToggle';
import getI18nTranslator from '../../../shared/config/i18n/utils/get-i18n-translator';

interface Props {
  isLogin: boolean;
  gnbList: SiteGnb[];
  themeType: ThemeType;
}

export default async function HomeHeader({ isLogin, gnbList, themeType }: Props) {
  const lang = await getLangCookie();
  const { dict } = await getI18nTranslator(lang, I18N_DICTIONARY_NAMESPACE.HOME);

  return (
    <header className="sticky top-0 z-50 p-4 bg-primary text-white">
      <div className="w-full flex items-center justify-between">
        <div>
          <HomeBtn />
        </div>
        <div className="flex items-center justify-between">
          <div className="mr-2">
            <LangToggle />
          </div>
          <div className="mr-2">
            <ThemeToggle themeType={themeType} />
          </div>
          <div>{isLogin ? <LogoutBtn /> : <LoginBtn />}</div>
        </div>
      </div>
    </header>
  );
}
