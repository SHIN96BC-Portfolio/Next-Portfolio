'use client';

import LangSegmentToggle from '@FsdEntities/lang/ui/LangSegmentToggle';
import ThemeToggle from '@FsdEntities/theme/ui/ThemeToggle';
import { DictionaryHome } from '@FsdShared/config/i18n/auto-gen/types/home';
import { ThemeType } from '@FsdShared/config/theme/model/type';
import PortfolioPrintButton from '@FsdShared/print/ui/PortfolioPrintButton';
import { BottomSheet } from '@FsdShared/sheet/ui';
import { type ReactNode } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  printHref: string;
  homeDict: DictionaryHome;
  themeType: ThemeType;
  onShareClick: () => void;
}

export default function PortfolioSettingsSheet({ open, onClose, printHref, homeDict, themeType, onShareClick }: Props) {
  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title={homeDict.settings.title}
      closeLabel={homeDict.settings.close}
      ariaLabel={homeDict.settings.title}
      backdropLabel={homeDict.settings.close}
    >
      <div className="space-y-3">
        <SettingsRow label={homeDict.share.button}>
          <button
            type="button"
            onClick={() => {
              onClose();
              onShareClick();
            }}
            className="flex w-full items-center justify-center rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            {homeDict.share.button}
          </button>
        </SettingsRow>

        <SettingsRow label={homeDict.resume.print}>
          <PortfolioPrintButton label={homeDict.resume.print} href={printHref} fullWidth />
        </SettingsRow>

        <SettingsRow label={homeDict.settings.language}>
          <LangSegmentToggle fullWidth onChange={onClose} />
        </SettingsRow>

        <SettingsRow label={homeDict.settings.theme}>
          <div className="w-full [&_button]:w-full">
            <ThemeToggle themeType={themeType} />
          </div>
        </SettingsRow>
      </div>
    </BottomSheet>
  );
}

function SettingsRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      {children}
    </div>
  );
}
