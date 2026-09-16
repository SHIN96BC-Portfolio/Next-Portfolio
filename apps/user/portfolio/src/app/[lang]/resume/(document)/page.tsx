import PortfolioResumePage from '@FsdPages/portfolio-resume/PortfolioResumePage';
import { I18N_DICTIONARY_NAMESPACE } from '@FsdShared/config/i18n';
import { I18N_LOCALE } from '@FsdShared/config/i18n/auto-gen/constants/i18n-locales';
import { resolveLocale } from '@FsdShared/config/i18n/constants/resolve-locale';
import getI18nTranslator from '@FsdShared/config/i18n/utils/get-i18n-translator';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const { dict } = await getI18nTranslator(locale, I18N_DICTIONARY_NAMESPACE.HOME);

  return {
    title: `${dict.resume.title} | ${dict.header.brand}`,
    description:
      locale === I18N_LOCALE.EN
        ? 'Resume of frontend developer Byeongcheol Shin'
        : locale === I18N_LOCALE.JA
          ? 'フロントエンド開発者 申秉澈の職務経歴書'
          : '프론트엔드 개발자 신병철의 경력기술서',
  };
}

export default async function ResumePage({ params }: Props) {
  const { lang } = await params;

  return <PortfolioResumePage lang={resolveLocale(lang)} />;
}
