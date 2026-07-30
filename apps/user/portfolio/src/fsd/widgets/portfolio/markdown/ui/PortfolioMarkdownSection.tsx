'use client';

import { MarkdownConfig } from '@FsdEntities/content/model/types';
import ScrollReveal from '@FsdFeatures/scroll-reveal/ui/ScrollReveal';
import RenderMarkdownText from '@FsdShared/markdown/ui/RenderMarkdownText';
import { SectionHeader } from '@FsdShared/section-header/ui';

interface Props {
  id: string;
  title: string;
  config: MarkdownConfig;
  variant?: 'fade-up' | 'slide-left' | 'slide-right';
  alternate?: boolean;
}

export default function PortfolioMarkdownSection({ id, title, config, variant = 'fade-up', alternate = false }: Props) {
  return (
    <section id={id} className={`py-20 sm:py-28 ${alternate ? 'bg-muted/50' : 'bg-background'}`}>
      <div className="mx-auto max-w-3xl px-6">
        <ScrollReveal variant={variant}>
          <SectionHeader title={title} />
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={150}>
          <div className="mt-10 prose prose-neutral dark:prose-invert max-w-none text-foreground leading-relaxed space-y-4 break-words [overflow-wrap:anywhere] [&_p]:text-base [&_p]:sm:text-lg [&_p]:text-muted-foreground [&_strong]:text-foreground [&_strong]:font-semibold">
            <RenderMarkdownText text={config.body} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
