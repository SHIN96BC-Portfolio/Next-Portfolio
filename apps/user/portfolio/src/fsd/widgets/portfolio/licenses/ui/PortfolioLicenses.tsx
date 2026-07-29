'use client';

import { LicensesConfig } from '@FsdEntities/content/model/types';
import ScrollReveal from '@FsdFeatures/scroll-reveal/ui/ScrollReveal';
import { SectionHeader } from '@FsdShared/section-header/ui';

interface Props {
  title: string;
  config: LicensesConfig;
}

export default function PortfolioLicenses({ title, config }: Props) {
  return (
    <section id="licenses" className="py-20 sm:py-28 bg-background">
      <div className="mx-auto max-w-3xl px-6">
        <ScrollReveal variant="fade-up">
          <SectionHeader title={title} />
        </ScrollReveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {config.items.map((item, index) => (
            <ScrollReveal key={item.name} variant="fade-up" delay={index * 100}>
              <div className="rounded-2xl border border-border bg-card p-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary text-lg font-bold">
                  ✓
                </div>
                <h3 className="font-semibold text-card-foreground text-sm sm:text-base">{item.name}</h3>
                <p className="mt-2 text-xs text-muted-foreground">{item.date}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
