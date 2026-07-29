'use client';

import { SkillsConfig } from '@FsdEntities/content/model/types';
import ScrollReveal from '@FsdFeatures/scroll-reveal/ui/ScrollReveal';
import { SectionHeader } from '@FsdShared/section-header/ui';

interface Props {
  title: string;
  config: SkillsConfig;
}

export default function PortfolioSkills({ title, config }: Props) {
  return (
    <section id="skills" className="py-20 sm:py-28 bg-muted/50">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal variant="fade-up">
          <SectionHeader title={title} />
        </ScrollReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {config.groups.map((group, index) => (
            <ScrollReveal key={group.title} variant="fade-up" delay={index * 80}>
              <div className="rounded-2xl border border-border bg-card p-6 h-full">
                <h3 className="text-base font-bold text-card-foreground mb-4">{group.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
