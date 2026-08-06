import { PortfolioLayoutProps } from '@FsdApp/layouts/get-portfolio-layout-props';
import PortfolioHeader from '@FsdWidgets/header/ui/PortfolioHeader';

interface Props extends PortfolioLayoutProps {
  children: React.ReactNode;
}

/** 홈 랜딩 전용 shell — 페이지 nav + 섹션 scroll nav */
export default function LandingPageLayout({ themeType, homeDict, gnbList, children }: Props) {
  return (
    <main>
      <PortfolioHeader themeType={themeType} homeDict={homeDict} gnbList={gnbList} />
      {children}
    </main>
  );
}
