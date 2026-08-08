'use client';

import { SiteGnb } from '@FsdEntities/site/model/client/gnb';
import { isGnbLinkActive, resolveGnbHref } from '@FsdShared/config/routing/resolve-gnb-href';
import mergeClassNames from '@FsdShared/utils/style/merge-class-names';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

interface Props {
  items: SiteGnb[];
  className?: string;
}

export default function SiteNavLinks({ items, className }: Props) {
  const pathname = usePathname() ?? '/';
  const params = useParams<{ lang: string }>();
  const lang = params?.lang ?? 'ko';

  if (items.length === 0) {
    return null;
  }

  return (
    <nav className={mergeClassNames('flex items-center gap-1', className)} aria-label="site navigation">
      {items.map((item) => {
        const href = resolveGnbHref(item.path, lang);
        const isActive = isGnbLinkActive(pathname, item.path, lang);
        const isExternal = href.startsWith('http');

        const linkClassName = mergeClassNames(
          'rounded-full px-3 py-1.5 text-sm transition-colors',
          isActive
            ? 'bg-primary/10 text-primary font-medium'
            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
        );

        if (isExternal) {
          return (
            <a key={item.id} href={href} target="_blank" rel="noopener noreferrer" className={linkClassName}>
              {item.name}
            </a>
          );
        }

        return (
          <Link key={item.id} href={href} className={linkClassName} aria-current={isActive ? 'page' : undefined}>
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
