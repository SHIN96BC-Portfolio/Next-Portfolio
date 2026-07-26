'use client';

import { ContactConfig } from '@FsdEntities/content/model/types';
import ScrollReveal from '@FsdFeatures/scroll-reveal/ui/ScrollReveal';
import { SectionHeader } from '@FsdShared/section-header/ui';

interface Props {
  title: string;
  config: ContactConfig;
}

export default function PortfolioContact({ title, config }: Props) {
  return (
    <section id="contact" className="py-20 sm:py-28 bg-background">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <ScrollReveal variant="fade-up">
          <SectionHeader title={title} align="center" />
        </ScrollReveal>

        {config.message && (
          <ScrollReveal variant="fade-up" delay={100}>
            <p className="mt-6 text-muted-foreground text-base sm:text-lg">{config.message}</p>
          </ScrollReveal>
        )}

        <ScrollReveal variant="fade-up" delay={200}>
          <a
            href={`mailto:${config.email}`}
            className="mt-8 inline-block text-2xl sm:text-3xl font-bold text-primary hover:text-primary-hover transition-colors break-all"
          >
            {config.email}
          </a>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={300}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {config.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target={link.type === 'email' ? undefined : '_blank'}
                rel={link.type === 'email' ? undefined : 'noopener noreferrer'}
                className="rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={400}>
          <p className="mt-16 text-xs text-muted-foreground">© {new Date().getFullYear()} 신병철. Built with Next.js</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
