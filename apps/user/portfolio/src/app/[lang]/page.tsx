import { getPortfolioLayoutProps } from '@FsdApp/layouts/get-portfolio-layout-props';
import LandingPageLayout from '@FsdApp/layouts/LandingPageLayout';
import PortfolioHomePage from '@FsdPages/portfolio-home/PortfolioHomePage';
import { resolveLocale } from '@FsdShared/config/i18n/constants/resolve-locale';

type PageProps = {
  params: Promise<{ lang: string }>;
};

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const layoutProps = await getPortfolioLayoutProps(lang);

  return (
    <LandingPageLayout {...layoutProps}>
      <PortfolioHomePage lang={resolveLocale(lang)} />
    </LandingPageLayout>
  );
}
