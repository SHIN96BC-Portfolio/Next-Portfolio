'use client';

import mergeClassNames from '@FsdShared/utils/style/merge-class-names';
import { type ReactNode, useEffect, useRef, useState } from 'react';

export type ScrollRevealVariant = 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right';

interface Props {
  children: ReactNode;
  variant?: ScrollRevealVariant;
  delay?: number;
  className?: string;
}

export default function ScrollReveal({ children, variant = 'fade-up', delay = 0, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={mergeClassNames(
        'scroll-reveal',
        `scroll-reveal--${variant}`,
        isVisible && 'scroll-reveal--visible',
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
