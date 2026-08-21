import PortfolioHomePage from '@FsdPages/portfolio-home/PortfolioHomePage';
import { resolveLocale } from '@FsdShared/config/i18n/constants/resolve-locale';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ lang: string }>;
}

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function HomePrintPage({ params }: Props) {
  const { lang } = await params;

  return <PortfolioHomePage lang={resolveLocale(lang)} displayVariant="print" />;
}
