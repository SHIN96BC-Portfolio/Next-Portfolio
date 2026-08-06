import DocumentPageLayout from '@FsdApp/layouts/DocumentPageLayout';
import { getPortfolioLayoutProps } from '@FsdApp/layouts/get-portfolio-layout-props';

interface Props {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function ResumeLayout({ children, params }: Props) {
  const { lang } = await params;
  const layoutProps = await getPortfolioLayoutProps(lang);

  return <DocumentPageLayout {...layoutProps}>{children}</DocumentPageLayout>;
}
