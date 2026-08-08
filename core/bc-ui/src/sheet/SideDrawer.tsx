'use client';

import { type ReactNode } from 'react';
import { mergeClassNames } from '../utils';
import { OverlayRoot, SheetHeader } from './OverlayRoot';

export interface SideDrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  closeLabel?: string;
  ariaLabel?: string;
  backdropLabel?: string;
  children: ReactNode;
  side?: 'left' | 'right';
  className?: string;
}

export default function SideDrawer({
  open,
  onClose,
  title,
  closeLabel = 'Close',
  ariaLabel,
  backdropLabel = 'Close',
  children,
  side = 'left',
  className,
}: SideDrawerProps) {
  return (
    <OverlayRoot open={open} onClose={onClose} backdropLabel={backdropLabel}>
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel ?? title}
        className={mergeClassNames(
          'absolute top-0 flex h-full w-[min(85vw,18rem)] flex-col border-border bg-background shadow-xl',
          side === 'left' ? 'left-0 border-r' : 'right-0 border-l',
          className
        )}
      >
        <SheetHeader
          title={title}
          onClose={onClose}
          closeLabel={closeLabel}
          className="mb-0 shrink-0 border-b border-border px-4 py-3"
        />
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      </aside>
    </OverlayRoot>
  );
}
