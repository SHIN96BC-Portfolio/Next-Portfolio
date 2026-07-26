'use client';

import { EducationConfig } from '@FsdEntities/content/model/types';
import ScrollReveal from '@FsdFeatures/scroll-reveal/ui/ScrollReveal';
import { SectionHeader } from '@FsdShared/section-header/ui';

interface Props {
  title: string;
  config: EducationConfig;
}

export default function PortfolioEducation({ title, config }: Props) {
  return (
    <section id="education" className="py-20 sm:py-28 bg-muted/50">
      <div className="mx-auto max-w-3xl px-6">
        <ScrollReveal variant="fade-up">
          <SectionHeader title={title} />
        </ScrollReveal>

        <div className="mt-12 space-y-4">
          {config.items.map((item, index) => (
            <ScrollReveal key={item.school} variant="slide-left" delay={index * 100}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-bold text-card-foreground">{item.school}</h3>
                  <span className="text-sm font-medium text-primary">{item.period}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{item.location}</p>
                <ul className="mt-3 space-y-1">
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
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
