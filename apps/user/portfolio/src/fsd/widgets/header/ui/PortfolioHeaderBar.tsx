'use client';

import LangToggle from '@FsdEntities/lang/ui/LangToggle';
import { SiteGnb } from '@FsdEntities/site/model/client/gnb';
import ThemeToggle from '@FsdEntities/theme/ui/ThemeToggle';
import { DictionaryHome } from '@FsdShared/config/i18n/auto-gen/types/home';
import { buildPortfolioPath } from '@FsdShared/config/routing/site-routes';
import { ThemeType } from '@FsdShared/config/theme/model/type';
import PortfolioPrintButton from '@FsdShared/print/ui/PortfolioPrintButton';
import HeaderIconButton from '@FsdWidgets/header/ui/HeaderIconButton';
import PortfolioNavDrawer from '@FsdWidgets/header/ui/PortfolioNavDrawer';
import PortfolioSettingsSheet from '@FsdWidgets/header/ui/PortfolioSettingsSheet';
import SiteNavLinks from '@FsdWidgets/header/ui/SiteNavLinks';
import PortfolioShareDialog from '@FsdWidgets/share/ui/PortfolioShareDialog';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

interface Props {
  homeDict: DictionaryHome;
  gnbList: SiteGnb[];
  themeType: ThemeType;
  printHref: string;
}

export default function PortfolioHeaderBar({ homeDict, gnbList, themeType, printHref }: Props) {
  const params = useParams<{ lang: string }>();
  const lang = params?.lang ?? 'ko';
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const shareTitle = `${homeDict.header.brand} | Portfolio`;
  const shareDescription = homeDict.title;

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid h-14 grid-cols-[2.25rem_1fr_2.25rem] items-center gap-2 md:hidden">
          <HeaderIconButton label="메뉴 열기" onClick={() => setIsNavOpen(true)}>
            <MenuIcon />
          </HeaderIconButton>

          <Link
            href={buildPortfolioPath(lang, 'home')}
            className="min-w-0 truncate text-center text-base font-bold tracking-tight text-foreground hover:text-primary transition-colors"
          >
            {homeDict.header.brand}
          </Link>

          <HeaderIconButton label={homeDict.settings.title} onClick={() => setIsSettingsOpen(true)}>
            <SettingsIcon />
          </HeaderIconButton>
        </div>

        <div className="hidden h-16 items-center justify-between gap-4 md:flex">
          <Link
            href={buildPortfolioPath(lang, 'home')}
            className="shrink-0 text-lg font-bold tracking-tight text-foreground hover:text-primary transition-colors"
          >
            {homeDict.header.brand}
          </Link>

          <SiteNavLinks items={gnbList} className="flex-1 justify-center" />

          <div className="flex shrink-0 items-center gap-2">
            <HeaderActionButton onClick={() => setIsShareOpen(true)}>{homeDict.share.button}</HeaderActionButton>
            <PortfolioPrintButton label={homeDict.resume.print} href={printHref} />
            <LangToggle />
            <ThemeToggle themeType={themeType} />
          </div>
        </div>
      </div>

      <PortfolioNavDrawer
        open={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        items={gnbList}
        title={homeDict.header.brand}
        closeLabel={homeDict.settings.close}
      />

      <PortfolioSettingsSheet
        open={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        printHref={printHref}
        homeDict={homeDict}
        themeType={themeType}
        onShareClick={() => setIsShareOpen(true)}
      />

      <PortfolioShareDialog
        open={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        homeDict={homeDict}
        shareTitle={shareTitle}
        shareDescription={shareDescription}
      />
    </>
  );
}

function HeaderActionButton({ children, onClick }: { children: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
    >
      {children}
    </button>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
