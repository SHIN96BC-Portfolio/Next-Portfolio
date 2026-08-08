'use client';

import { type ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { mergeClassNames } from '../utils';
import { useEscapeClose, useOverlayLock } from './useOverlayEffects';

interface OverlayRootProps {
  open: boolean;
  onClose: () => void;
  backdropLabel: string;
  children: ReactNode;
}

export function OverlayRoot({ open, onClose, backdropLabel, children }: OverlayRootProps) {
  const [mounted, setMounted] = useState(false);

  useOverlayLock(open);
  useEscapeClose(open, onClose);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!open || !mounted) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[100]" role="presentation">
      <button type="button" className="absolute inset-0 bg-black/40" aria-label={backdropLabel} onClick={onClose} />
      {children}
    </div>,
    document.body
  );
}

export interface SheetHeaderProps {
  title?: string;
  onClose: () => void;
  closeLabel: string;
  className?: string;
}

export function SheetHeader({ title, onClose, closeLabel, className }: SheetHeaderProps) {
  if (!title) {
    return null;
  }

  return (
    <div className={mergeClassNames('mb-4 flex items-center justify-between', className)}>
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      <button
        type="button"
        onClick={onClose}
        className="rounded-full px-2 py-1 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      >
        {closeLabel}
      </button>
    </div>
  );
}
