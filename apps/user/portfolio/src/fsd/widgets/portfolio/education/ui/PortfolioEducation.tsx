'use client';

import { EducationConfig } from '@FsdEntities/content/model/types';
import ScrollReveal from '@FsdFeatures/scroll-reveal/ui/ScrollReveal';
import { DisplayVariant, isPrintVariant } from '@FsdShared/display/model/display-variant';
import { SectionHeader } from '@FsdShared/section-header/ui';

interface Props {
  title: string;
  config: EducationConfig;
  displayVariant?: DisplayVariant;
}

export default function PortfolioEducation({ title, config, displayVariant = 'screen' }: Props) {
  const isPrint = isPrintVariant(displayVariant);

  const list = (
    <div className={isPrint ? 'mt-6 space-y-3' : 'mt-12 space-y-4'}>
      {config.items.map((item, index) => {
        const card = (
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-bold text-card-foreground">{item.school}</h3>
              <span className="text-sm font-medium text-primary">{item.period}</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{item.location}</p>
            <ul className="mt-2 space-y-1">
              {item.details.map((detail) => (
                <li
                  key={detail}
                  className="text-sm text-muted-foreground flex gap-2 before:content-['•'] before:text-primary"
                >
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        );

        if (isPrint) {
          return <div key={item.school}>{card}</div>;
        }

        return (
          <ScrollReveal key={item.school} variant="slide-left" delay={index * 100}>
            {card}
          </ScrollReveal>
        );
      })}
    </div>
  );

  return (
    <section id="education" className={isPrint ? 'print-section bg-muted/50' : 'py-20 sm:py-28 bg-muted/50'}>
      <div className={isPrint ? 'print-section__inner max-w-3xl' : 'mx-auto max-w-3xl px-6'}>
        {isPrint ? (
          <SectionHeader title={title} />
        ) : (
          <ScrollReveal variant="fade-up">
            <SectionHeader title={title} />
          </ScrollReveal>
        )}
        {list}
      </div>
    </section>
  );
}
