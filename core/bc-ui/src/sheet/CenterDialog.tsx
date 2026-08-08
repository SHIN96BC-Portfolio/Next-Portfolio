'use client';

import { type ReactNode } from 'react';
import { mergeClassNames } from '../utils';
import { OverlayRoot, SheetHeader } from './OverlayRoot';

export interface CenterDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  closeLabel?: string;
  ariaLabel?: string;
  backdropLabel?: string;
  children: ReactNode;
  className?: string;
}

export default function CenterDialog({
  open,
  onClose,
  title,
  closeLabel = 'Close',
  ariaLabel,
  backdropLabel = 'Close',
  children,
  className,
}: CenterDialogProps) {
  return (
    <OverlayRoot open={open} onClose={onClose} backdropLabel={backdropLabel}>
      <section
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel ?? title}
        className={mergeClassNames(
          'absolute w-[min(92vw,28rem)] rounded-2xl border border-border bg-background p-5 shadow-2xl',
          className
        )}
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          maxHeight: 'min(90vh, 40rem)',
          overflowY: 'auto',
        }}
      >
        <SheetHeader title={title} onClose={onClose} closeLabel={closeLabel} />
        {children}
      </section>
    </OverlayRoot>
  );
}
