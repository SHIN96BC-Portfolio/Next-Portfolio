import { CONTENT_LANG, resolveContentLang } from '@FsdEntities/content/model/types';
import PortfolioResumePage from '@FsdPages/portfolio-resume/PortfolioResumePage';
import { I18N_DICTIONARY_NAMESPACE, Locale } from '@FsdShared/config/i18n';
import getI18nTranslator from '@FsdShared/config/i18n/utils/get-i18n-translator';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const contentLang = resolveContentLang(lang);
  const { dict } = await getI18nTranslator(contentLang as Locale, I18N_DICTIONARY_NAMESPACE.HOME);

  return {
    title: `${dict.resume.title} | ${dict.header.brand}`,
    description:
      contentLang === CONTENT_LANG.EN
        ? 'Resume of frontend developer Byeongcheol Shin'
        : contentLang === CONTENT_LANG.JA
          ? 'フロントエンド開発者 申秉澈の職務経歴書'
          : '프론트엔드 개발자 신병철의 경력기술서',
  };
}

export default async function ResumePage({ params }: Props) {
  const { lang } = await params;

  return <PortfolioResumePage lang={resolveContentLang(lang)} />;
}
