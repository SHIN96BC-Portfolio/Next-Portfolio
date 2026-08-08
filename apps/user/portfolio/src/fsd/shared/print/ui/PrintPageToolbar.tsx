'use client';

import { DictionaryHome } from '@FsdShared/config/i18n/auto-gen/types/home';
import { buildPortfolioPath } from '@FsdShared/config/routing/site-routes';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Props {
  homeDict: DictionaryHome;
}

export default function PrintPageToolbar({ homeDict }: Props) {
  const params = useParams<{ lang: string }>();
  const lang = params?.lang ?? 'ko';

  return (
    <div className="no-print sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-6">
        <Link
          href={buildPortfolioPath(lang, 'home')}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          ← {homeDict.resume.backToHome}
        </Link>

        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
        >
          {homeDict.resume.print}
        </button>
      </div>
    </div>
  );
}
