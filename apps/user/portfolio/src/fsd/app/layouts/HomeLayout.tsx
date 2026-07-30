import { DictionaryHome } from '@FsdShared/config/i18n/auto-gen/types/home';
import { ThemeType } from '@FsdShared/config/theme/model/type';
import PortfolioHeader from '@FsdWidgets/header/ui/PortfolioHeader';

interface Props {
  themeType: ThemeType;
  homeDict: DictionaryHome;
  children: React.ReactNode;
}

export default function HomeLayout({ themeType, homeDict, children }: Props) {
  return (
    <main>
      <PortfolioHeader themeType={themeType} homeDict={homeDict} />
      {children}
    </main>
  );
}
