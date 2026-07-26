import { ThemeType } from '@FsdShared/config/theme/model/type';
import PortfolioHeader from '@FsdWidgets/header/ui/PortfolioHeader';

interface Props {
  themeType: ThemeType;
  children: React.ReactNode;
}

export default function HomeLayout({ themeType, children }: Props) {
  return (
    <main>
      <PortfolioHeader themeType={themeType} />
      {children}
    </main>
  );
}
