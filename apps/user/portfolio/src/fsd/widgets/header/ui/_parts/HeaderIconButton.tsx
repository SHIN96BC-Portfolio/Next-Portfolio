'use client';

import mergeClassNames from '@FsdShared/utils/style/merge-class-names';
import { type ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export default function HeaderIconButton({ label, className, children, ...props }: Props) {
  return (
    <button
      type="button"
      aria-label={label}
      className={mergeClassNames(
        'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-accent [&_svg]:block [&_svg]:h-5 [&_svg]:w-5 [&_svg]:shrink-0',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
