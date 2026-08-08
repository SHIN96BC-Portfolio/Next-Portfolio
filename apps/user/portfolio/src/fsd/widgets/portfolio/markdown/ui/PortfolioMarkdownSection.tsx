'use client';

import { MarkdownConfig } from '@FsdEntities/content/model/types';
import ScrollReveal from '@FsdFeatures/scroll-reveal/ui/ScrollReveal';
import { DisplayVariant, isPrintVariant } from '@FsdShared/display/model/display-variant';
import RenderMarkdownText from '@FsdShared/markdown/ui/RenderMarkdownText';
import { SectionHeader } from '@FsdShared/section-header/ui';

interface Props {
  id: string;
  title: string;
  config: MarkdownConfig;
  variant?: 'fade-up' | 'slide-left' | 'slide-right';
  alternate?: boolean;
  displayVariant?: DisplayVariant;
}

export default function PortfolioMarkdownSection({
  id,
  title,
  config,
  variant = 'fade-up',
  alternate = false,
  displayVariant = 'screen',
}: Props) {
  const isPrint = isPrintVariant(displayVariant);
  const body = (
    <div className="mt-10 prose prose-neutral dark:prose-invert max-w-none text-foreground leading-relaxed space-y-4 break-words [overflow-wrap:anywhere] [&_p]:text-base [&_p]:sm:text-lg [&_p]:text-muted-foreground [&_strong]:text-foreground [&_strong]:font-semibold">
      <RenderMarkdownText text={config.body} />
    </div>
  );

  if (isPrint) {
    return (
      <section id={id} className={`print-section ${alternate ? 'bg-muted/50' : 'bg-background'}`}>
        <div className="print-section__inner max-w-3xl">
          <SectionHeader title={title} />
          <div className="mt-6">{body}</div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className={`py-20 sm:py-28 ${alternate ? 'bg-muted/50' : 'bg-background'}`}>
      <div className="mx-auto max-w-3xl px-6">
        <ScrollReveal variant={variant}>
          <SectionHeader title={title} />
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={150}>
          {body}
        </ScrollReveal>
      </div>
    </section>
  );
}
