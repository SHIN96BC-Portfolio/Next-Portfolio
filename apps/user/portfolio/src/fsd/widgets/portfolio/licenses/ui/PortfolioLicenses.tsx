'use client';

import { LicensesConfig } from '@FsdEntities/content/model/types';
import ScrollReveal from '@FsdFeatures/scroll-reveal/ui/ScrollReveal';
import { DisplayVariant, isPrintVariant } from '@FsdShared/display/model/display-variant';
import { SectionHeader } from '@FsdShared/section-header/ui';

interface Props {
  title: string;
  config: LicensesConfig;
  displayVariant?: DisplayVariant;
}

export default function PortfolioLicenses({ title, config, displayVariant = 'screen' }: Props) {
  const isPrint = isPrintVariant(displayVariant);

  const grid = (
    <div className={isPrint ? 'mt-6 grid gap-3 sm:grid-cols-3' : 'mt-12 grid gap-4 sm:grid-cols-3'}>
      {config.items.map((item, index) => {
        const card = (
          <div className="rounded-2xl border border-border bg-card p-5 text-center">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary text-lg font-bold">
              ✓
            </div>
            <h3 className="font-semibold text-card-foreground text-sm sm:text-base">{item.name}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{item.date}</p>
          </div>
        );

        if (isPrint) {
          return <div key={item.name}>{card}</div>;
        }

        return (
          <ScrollReveal key={item.name} variant="fade-up" delay={index * 100}>
            {card}
          </ScrollReveal>
        );
      })}
    </div>
  );

  return (
    <section id="licenses" className={isPrint ? 'print-section bg-background' : 'py-20 sm:py-28 bg-background'}>
      <div className={isPrint ? 'print-section__inner max-w-3xl' : 'mx-auto max-w-3xl px-6'}>
        {isPrint ? (
          <SectionHeader title={title} />
        ) : (
          <ScrollReveal variant="fade-up">
            <SectionHeader title={title} />
          </ScrollReveal>
        )}
        {grid}
      </div>
    </section>
  );
}
