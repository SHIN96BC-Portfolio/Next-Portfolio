'use client';

import { SiteGnb } from '@FsdEntities/site/model/client/gnb';
import { isGnbLinkActive, resolveGnbHref } from '@FsdShared/config/routing/resolve-gnb-href';
import { SideDrawer } from '@FsdShared/sheet/ui';
import mergeClassNames from '@FsdShared/utils/style/merge-class-names';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

interface Props {
  open: boolean;
  onClose: () => void;
  items: SiteGnb[];
  title: string;
  closeLabel: string;
}

export default function PortfolioNavDrawer({ open, onClose, items, title, closeLabel }: Props) {
  const pathname = usePathname() ?? '/';
  const params = useParams<{ lang: string }>();
  const lang = params?.lang ?? 'ko';

  return (
    <SideDrawer
      open={open}
      onClose={onClose}
      title={title}
      closeLabel={closeLabel}
      ariaLabel={title}
      backdropLabel={closeLabel}
    >
      <nav className="flex flex-col gap-1 p-3" aria-label="site navigation">
        {items.map((item) => {
          const href = resolveGnbHref(item.path, lang);
          const isActive = isGnbLinkActive(pathname, item.path, lang);
          const isExternal = href.startsWith('http');

          const linkClassName = mergeClassNames(
            'rounded-xl px-4 py-3 text-base transition-colors',
            isActive ? 'bg-primary/10 text-primary font-medium' : 'text-foreground hover:bg-accent'
          );

          if (isExternal) {
            return (
              <a
                key={item.id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClassName}
                onClick={onClose}
              >
                {item.name}
              </a>
            );
          }

          return (
            <Link
              key={item.id}
              href={href}
              className={linkClassName}
              aria-current={isActive ? 'page' : undefined}
              onClick={onClose}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </SideDrawer>
  );
}
