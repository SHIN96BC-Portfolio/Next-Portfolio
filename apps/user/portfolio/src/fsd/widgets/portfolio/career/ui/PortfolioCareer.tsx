'use client';

import { ContentLang, TimelineConfig } from '@FsdEntities/content/model/types';
import ScrollReveal from '@FsdFeatures/scroll-reveal/ui/ScrollReveal';
import { buildPortfolioPath } from '@FsdShared/config/routing/site-routes';
import { DisplayVariant, isPrintVariant } from '@FsdShared/display/model/display-variant';
import { SectionHeader } from '@FsdShared/section-header/ui';
import formatEmploymentPeriod, { formatTotalEmploymentPeriod } from '@FsdShared/utils/date/format-employment-period';
import Link from 'next/link';

interface Props {
  title: string;
  config: TimelineConfig;
  lang: ContentLang;
  resumeLinkLabel: string;
  displayVariant?: DisplayVariant;
}

export default function PortfolioCareer({ title, config, lang, resumeLinkLabel, displayVariant = 'screen' }: Props) {
  const isPrint = isPrintVariant(displayVariant);
  const totalEmploymentPeriod = formatTotalEmploymentPeriod(
    config.items.map((item) => item.period),
    lang
  );

  const header = (
    <SectionHeader
      title={title}
      trailing={
        totalEmploymentPeriod ? (
          <span className="text-sm sm:text-base font-medium text-primary">{totalEmploymentPeriod}</span>
        ) : undefined
      }
    />
  );

  const timeline = (
    <div className={isPrint ? 'mt-6 relative' : 'mt-12 relative'}>
      <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-border" aria-hidden />

      <div className={isPrint ? 'space-y-4' : 'space-y-8'}>
        {config.items.map((item, index) => {
          const itemNode = (
            <div className="relative pl-8">
              <div
                className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-primary bg-background"
                aria-hidden
              />
              <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-bold text-card-foreground">{item.company}</h3>
                  <span className="text-sm font-medium text-primary">{formatEmploymentPeriod(item.period, lang)}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.department} · {item.position} · {item.location}
                </p>
                <p className="mt-2 text-sm font-medium text-foreground">{item.role}</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </div>
          );

          if (isPrint) {
            return <div key={item.id}>{itemNode}</div>;
          }

          return (
            <ScrollReveal key={item.id} variant="slide-right" delay={index * 100}>
              {itemNode}
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );

  return (
    <section id="career" className={isPrint ? 'print-section bg-background' : 'py-20 sm:py-28 bg-background'}>
      <div className={isPrint ? 'print-section__inner max-w-3xl' : 'mx-auto max-w-3xl px-6'}>
        {isPrint ? header : <ScrollReveal variant="fade-up">{header}</ScrollReveal>}
        {timeline}

        {!isPrint ? (
          <ScrollReveal variant="fade-up" delay={200}>
            <div className="mt-10 flex justify-center">
              <Link
                href={buildPortfolioPath(lang, 'resume')}
                className="inline-flex items-center rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
              >
                {resumeLinkLabel}
              </Link>
            </div>
          </ScrollReveal>
        ) : null}
      </div>
    </section>
  );
}
