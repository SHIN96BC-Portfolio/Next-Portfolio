'use client';

import { SiteGnb } from '@FsdEntities/site/model/client/gnb';
import { DictionaryHome } from '@FsdShared/config/i18n/auto-gen/types/home';
import { ThemeType } from '@FsdShared/config/theme/model/type';
import { buildPortfolioPrintPath } from '@FsdShared/print/config/print-targets';
import mergeClassNames from '@FsdShared/utils/style/merge-class-names';
import HomeSectionNav from '@FsdWidgets/header/ui/HomeSectionNav';
import PortfolioHeaderBar from '@FsdWidgets/header/ui/PortfolioHeaderBar';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Props {
  themeType: ThemeType;
  homeDict: DictionaryHome;
  gnbList: SiteGnb[];
}

export default function PortfolioHeader({ themeType, homeDict, gnbList }: Props) {
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
        isScrolled ? 'border-b border-border/60 bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <PortfolioHeaderBar
        homeDict={homeDict}
        gnbList={gnbList}
        themeType={themeType}
        printHref={buildPortfolioPrintPath(lang, 'homePrint')}
      />

      <HomeSectionNav homeDict={homeDict} />
    </header>
  );
}
