import { PortfolioLayoutProps } from '@FsdApp/layouts/get-portfolio-layout-props';
import PortfolioDocumentHeader from '@FsdWidgets/header/ui/PortfolioDocumentHeader';

interface Props extends PortfolioLayoutProps {
  children: React.ReactNode;
}

/** 문서형 페이지 전용 shell — 페이지 nav + 인쇄 */
export default function DocumentPageLayout({ themeType, homeDict, gnbList, children }: Props) {
  return (
    <main>
      <PortfolioDocumentHeader themeType={themeType} homeDict={homeDict} gnbList={gnbList} />
      {children}
    </main>
  );
}
