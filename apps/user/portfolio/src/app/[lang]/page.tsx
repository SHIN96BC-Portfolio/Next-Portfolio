import { getPortfolioLayoutProps } from '@FsdApp/layouts/get-portfolio-layout-props';
import LandingPageLayout from '@FsdApp/layouts/LandingPageLayout';
import { resolveContentLang } from '@FsdEntities/content/model/types';
import PortfolioHomePage from '@FsdPages/portfolio-home/PortfolioHomePage';

type PageProps = {
  params: Promise<{ lang: string }>;
};

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const layoutProps = await getPortfolioLayoutProps(lang);

  return (
    <LandingPageLayout {...layoutProps}>
      <PortfolioHomePage lang={resolveContentLang(lang)} />
    </LandingPageLayout>
  );
}
