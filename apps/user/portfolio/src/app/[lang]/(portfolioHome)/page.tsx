import { resolveContentLang } from '@FsdEntities/content/model/types';
import PortfolioHomePage from '@FsdPages/portfolio-home/PortfolioHomePage';

type PageProps = {
  params: Promise<{ lang: string }>;
};

export default async function Page({ params }: PageProps) {
  const { lang } = await params;

  return <PortfolioHomePage lang={resolveContentLang(lang)} />;
}
