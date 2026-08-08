'use client';

import { SkillsConfig } from '@FsdEntities/content/model/types';
import ScrollReveal from '@FsdFeatures/scroll-reveal/ui/ScrollReveal';
import { DisplayVariant, isPrintVariant } from '@FsdShared/display/model/display-variant';
import { SectionHeader } from '@FsdShared/section-header/ui';

interface Props {
  title: string;
  config: SkillsConfig;
  displayVariant?: DisplayVariant;
}

export default function PortfolioSkills({ title, config, displayVariant = 'screen' }: Props) {
  const isPrint = isPrintVariant(displayVariant);

  const grid = (
    <div
      className={
        isPrint ? 'mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3' : 'mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
      }
    >
      {config.groups.map((group, index) => {
        const card = (
          <div className="rounded-2xl border border-border bg-card p-5 h-full">
            <h3 className="text-base font-bold text-card-foreground mb-3">{group.title}</h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  {item}
                </span>
              ))}
            </div>
          </div>
        );

        if (isPrint) {
          return <div key={group.title}>{card}</div>;
        }

        return (
          <ScrollReveal key={group.title} variant="fade-up" delay={index * 80}>
            {card}
          </ScrollReveal>
        );
      })}
    </div>
  );

  return (
    <section id="skills" className={isPrint ? 'print-section bg-muted/50' : 'py-20 sm:py-28 bg-muted/50'}>
      <div className={isPrint ? 'print-section__inner' : 'mx-auto max-w-5xl px-6'}>
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
