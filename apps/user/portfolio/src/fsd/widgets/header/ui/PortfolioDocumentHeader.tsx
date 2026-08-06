'use client';

import LangToggle from '@FsdEntities/lang/ui/LangToggle';
import { SiteGnb } from '@FsdEntities/site/model/client/gnb';
import ThemeToggle from '@FsdEntities/theme/ui/ThemeToggle';
import { DictionaryHome } from '@FsdShared/config/i18n/auto-gen/types/home';
import { buildPortfolioPath } from '@FsdShared/config/routing/site-routes';
import { ThemeType } from '@FsdShared/config/theme/model/type';
import mergeClassNames from '@FsdShared/utils/style/merge-class-names';
import SiteNavLinks from '@FsdWidgets/header/ui/SiteNavLinks';
import ResumePrintButton from '@FsdWidgets/resume/ui/ResumePrintButton';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Props {
  themeType: ThemeType;
  homeDict: DictionaryHome;
  gnbList: SiteGnb[];
}

export default function PortfolioDocumentHeader({ themeType, homeDict, gnbList }: Props) {
  const params = useParams<{ lang: string }>();
  const lang = params?.lang ?? 'ko';
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={mergeClassNames(
        'no-print sticky top-0 z-50 transition-all duration-300',
        isScrolled ? 'border-b border-border/60 bg-background/80 backdrop-blur-md shadow-sm' : 'bg-background'
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <Link
          href={buildPortfolioPath(lang, 'home')}
          className="shrink-0 text-lg font-bold tracking-tight text-foreground hover:text-primary transition-colors"
        >
          {homeDict.header.brand}
        </Link>

        <SiteNavLinks items={gnbList} className="hidden md:flex flex-1 justify-center" />

        <div className="flex shrink-0 items-center gap-2">
          <ResumePrintButton homeDict={homeDict} />
          <LangToggle />
          <ThemeToggle themeType={themeType} />
        </div>
      </div>
    </header>
  );
}
