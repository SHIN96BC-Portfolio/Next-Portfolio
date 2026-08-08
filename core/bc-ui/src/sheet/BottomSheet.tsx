'use client';

import { type ReactNode } from 'react';
import { mergeClassNames } from '../utils';
import { OverlayRoot, SheetHeader } from './OverlayRoot';

export interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  closeLabel?: string;
  ariaLabel?: string;
  backdropLabel?: string;
  children: ReactNode;
  className?: string;
}

export default function BottomSheet({
  open,
  onClose,
  title,
  closeLabel = 'Close',
  ariaLabel,
  backdropLabel = 'Close',
  children,
  className,
}: BottomSheetProps) {
  return (
    <OverlayRoot open={open} onClose={onClose} backdropLabel={backdropLabel}>
      <section
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel ?? title}
        className={mergeClassNames(
          'absolute inset-x-0 bottom-0 rounded-t-2xl border-t border-border bg-background px-4 pb-6 pt-3 shadow-2xl',
          className
        )}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" aria-hidden />
        <SheetHeader title={title} onClose={onClose} closeLabel={closeLabel} />
        {children}
      </section>
    </OverlayRoot>
  );
}
