import { resolveContentLang } from '@FsdEntities/content/model/types';
import PortfolioHomePage from '@FsdPages/portfolio-home/PortfolioHomePage';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ lang: string }>;
}

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function HomePrintPage({ params }: Props) {
  const { lang } = await params;

  return <PortfolioHomePage lang={resolveContentLang(lang)} displayVariant="print" />;
}
