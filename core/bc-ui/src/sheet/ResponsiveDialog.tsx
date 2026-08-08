'use client';

import { type ReactNode } from 'react';
import { mergeClassNames } from '../utils';
import { OverlayRoot, SheetHeader } from './OverlayRoot';

export interface ResponsiveDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  closeLabel?: string;
  ariaLabel?: string;
  backdropLabel?: string;
  children: ReactNode;
  className?: string;
}

/** 모바일=하단 시트, PC(md+)=화면 중앙 다이얼로그 */
export default function ResponsiveDialog({
  open,
  onClose,
  title,
  closeLabel = 'Close',
  ariaLabel,
  backdropLabel = 'Close',
  children,
  className,
}: ResponsiveDialogProps) {
  return (
    <OverlayRoot open={open} onClose={onClose} backdropLabel={backdropLabel}>
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center md:items-center md:p-4">
        <section
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel ?? title}
          className={mergeClassNames(
            'pointer-events-auto w-full max-h-[90vh] overflow-y-auto rounded-t-2xl border-t border-border bg-background px-4 pb-6 pt-3 shadow-2xl',
            'md:max-h-[min(90vh,40rem)] md:w-[min(92vw,28rem)] md:rounded-2xl md:border md:p-5',
            className
          )}
        >
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border md:hidden" aria-hidden />
          <SheetHeader title={title} onClose={onClose} closeLabel={closeLabel} />
          {children}
        </section>
      </div>
    </OverlayRoot>
  );
}
