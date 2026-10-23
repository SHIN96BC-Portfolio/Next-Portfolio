'use client';

import { type ReactNode } from 'react';
import { mergeClassNames } from '../utils';
import CenterDialog from './CenterDialog';

const CONFIRM_TONE_CLASS: Record<'default' | 'danger', string> = {
  default: 'border border-border bg-accent text-foreground',
  danger: 'bg-red-600 text-white',
};

export interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: 'default' | 'danger';
  closeLabel?: string;
  backdropLabel?: string;
  className?: string;
}

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  children,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  tone = 'default',
  closeLabel,
  backdropLabel,
  className,
}: ConfirmDialogProps) {
  return (
    <CenterDialog
      open={open}
      onClose={onClose}
      title={title}
      closeLabel={closeLabel}
      backdropLabel={backdropLabel}
      className={className}
    >
      {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      {children}
      <div className="mt-5 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className={mergeClassNames(
            'rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
            CONFIRM_TONE_CLASS[tone]
          )}
        >
          {confirmLabel}
        </button>
      </div>
    </CenterDialog>
  );
}
