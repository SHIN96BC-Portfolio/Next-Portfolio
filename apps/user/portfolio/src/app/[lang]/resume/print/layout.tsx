import { getPortfolioLayoutProps } from '@FsdApp/layouts/get-portfolio-layout-props';
import PrintPageLayout from '@FsdApp/layouts/PrintPageLayout';

interface Props {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function ResumePrintLayout({ children, params }: Props) {
  const { lang } = await params;
  const { homeDict } = await getPortfolioLayoutProps(lang);

  return <PrintPageLayout homeDict={homeDict}>{children}</PrintPageLayout>;
}
