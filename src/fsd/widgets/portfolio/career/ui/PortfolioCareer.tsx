'use client';

import { TimelineConfig } from '@FsdEntities/content/model/types';
import ScrollReveal from '@FsdFeatures/scroll-reveal/ui/ScrollReveal';
import { SectionHeader } from '@FsdShared/section-header/ui';

interface Props {
  title: string;
  config: TimelineConfig;
}

export default function PortfolioCareer({ title, config }: Props) {
  return (
    <section id="career" className="py-20 sm:py-28 bg-background">
      <div className="mx-auto max-w-3xl px-6">
        <ScrollReveal variant="fade-up">
          <SectionHeader title={title} />
        </ScrollReveal>

        <div className="mt-12 relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-border" aria-hidden />

          <div className="space-y-8">
            {config.items.map((item, index) => (
              <ScrollReveal key={item.id} variant="slide-right" delay={index * 100}>
                <div className="relative pl-8">
                  <div
                    className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-primary bg-background"
                    aria-hidden
                  />
                  <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-lg font-bold text-card-foreground">{item.company}</h3>
                      <span className="text-sm font-medium text-primary">{item.period}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.department} · {item.position} · {item.location}
                    </p>
                    <p className="mt-2 text-sm font-medium text-foreground">{item.role}</p>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
