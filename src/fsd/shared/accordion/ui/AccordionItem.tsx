'use client';

import mergeClassNames from '@FsdShared/utils/style/merge-class-names';
import { type ReactNode, useEffect, useRef } from 'react';

type AccordionVariant = 'card' | 'nested';

interface Props {
  trigger: ReactNode;
  children: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  variant?: AccordionVariant;
  className?: string;
  contentClassName?: string;
  scrollOnOpen?: boolean;
  scrollOffset?: number;
}

const VARIANT_STYLES = {
  card: {
    container: 'rounded-2xl border border-border bg-card overflow-hidden shadow-sm',
    trigger: 'w-full flex items-start justify-between gap-4 p-6 text-left hover:bg-accent/50 transition-colors',
    chevron: 'mt-1 shrink-0 text-muted-foreground transition-transform duration-300',
    content: 'border-t border-border px-4 pt-4 pb-4 sm:px-6 sm:pt-5 sm:pb-6',
  },
  nested: {
    container: 'rounded-xl border border-border bg-background overflow-hidden',
    trigger: 'w-full flex items-start justify-between gap-4 p-5 text-left hover:bg-muted/50 transition-colors',
    chevron: 'shrink-0 text-muted-foreground text-sm transition-transform duration-300',
    content: 'border-t border-border px-5 pt-4 pb-5',
  },
} as const;

export default function AccordionItem({
  trigger,
  children,
  isOpen,
  onToggle,
  variant = 'card',
  className,
  contentClassName,
  scrollOnOpen = false,
  scrollOffset = 80,
}: Props) {
  const styles = VARIANT_STYLES[variant];
  const containerRef = useRef<HTMLDivElement>(null);
  const prevIsOpenRef = useRef(isOpen);

  useEffect(() => {
    if (!scrollOnOpen) return;

    const didOpen = isOpen && !prevIsOpenRef.current;
    prevIsOpenRef.current = isOpen;

    if (!didOpen) return;

    requestAnimationFrame(() => {
      const element = containerRef.current;
      if (!element) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const top = element.getBoundingClientRect().top + window.scrollY - scrollOffset;

      window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }, [isOpen, scrollOnOpen, scrollOffset]);

  return (
    <div ref={containerRef} className={mergeClassNames(styles.container, className)}>
      <button type="button" onClick={onToggle} className={styles.trigger} aria-expanded={isOpen}>
        {trigger}
        <span className={mergeClassNames(styles.chevron, isOpen && 'rotate-180')} aria-hidden>
          ▼
        </span>
      </button>
      {isOpen && <div className={mergeClassNames(styles.content, contentClassName)}>{children}</div>}
    </div>
  );
}
