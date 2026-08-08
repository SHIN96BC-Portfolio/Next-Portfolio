'use client';

import { HeroConfig } from '@FsdEntities/content/model/types';
import ScrollReveal from '@FsdFeatures/scroll-reveal/ui/ScrollReveal';
import { getPortfolioLandingHeaderOffset } from '@FsdShared/config/layout/portfolio-landing-header';
import { DisplayVariant, isPrintVariant } from '@FsdShared/display/model/display-variant';
import mergeClassNames from '@FsdShared/utils/style/merge-class-names';

interface Props {
  config: HeroConfig;
  displayVariant?: DisplayVariant;
}

const linkIcon: Record<HeroConfig['links'][number]['type'], string> = {
  github: 'GH',
  portfolio: 'SRC',
  email: '@',
};

export default function PortfolioHero({ config, displayVariant = 'screen' }: Props) {
  const isPrint = isPrintVariant(displayVariant);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const top = element.getBoundingClientRect().top + window.scrollY - getPortfolioLandingHeaderOffset();
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className={mergeClassNames(
        'relative bg-gradient-to-br from-background via-background to-muted',
        isPrint
          ? 'print-section'
          : 'flex min-h-[calc(100dvh-3.5rem)] md:min-h-[calc(100dvh-7rem)] items-center justify-center overflow-x-hidden'
      )}
    >
      {!isPrint ? (
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden opacity-30 dark:opacity-20"
          aria-hidden
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, var(--color-primary) 0%, transparent 50%), radial-gradient(circle at 80% 20%, var(--color-primary) 0%, transparent 40%)',
          }}
        />
      ) : null}

      <div
        className={mergeClassNames(
          'relative z-10 mx-auto w-full max-w-5xl text-center',
          isPrint ? 'print-section__inner' : 'px-6 py-20'
        )}
      >
        {isPrint ? (
          <>
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">Portfolio</p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">{config.name}</h1>
            <p className="mt-2 text-lg text-primary font-medium">{config.title}</p>
            <p className="mt-3 text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">{config.tagline}</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {config.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-card-foreground"
                >
                  <span className="text-xs font-bold text-primary">{linkIcon[link.type]}</span>
                  {link.label}
                </a>
              ))}
            </div>
          </>
        ) : (
          <>
            <ScrollReveal variant="fade-up">
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">Portfolio</p>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={100}>
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground">{config.name}</h1>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={200}>
              <p className="mt-4 text-xl sm:text-2xl text-primary font-medium">{config.title}</p>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={300}>
              <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {config.tagline}
              </p>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={400}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                {config.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target={link.type === 'email' ? undefined : '_blank'}
                    rel={link.type === 'email' ? undefined : 'noopener noreferrer'}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-card-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <span className="text-xs font-bold text-primary">{linkIcon[link.type]}</span>
                    {link.label}
                  </a>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={500}>
              <nav className="mt-14 flex flex-wrap justify-center gap-2" aria-label="섹션 바로가기">
                {[
                  { id: 'introduction', label: 'Intro' },
                  { id: 'about', label: 'About' },
                  { id: 'projects', label: 'Projects' },
                  { id: 'career', label: 'Career' },
                  { id: 'skills', label: 'Skills' },
                  { id: 'contact', label: 'Contact' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollTo(item.id)}
                    className="rounded-full px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </ScrollReveal>
          </>
        )}
      </div>

      {!isPrint ? (
        <button
          type="button"
          onClick={() => scrollTo('introduction')}
          className={mergeClassNames(
            'absolute bottom-5 left-1/2 z-10 -translate-x-1/2',
            'flex flex-col items-center gap-1 text-muted-foreground',
            'animate-bounce cursor-pointer hover:text-primary transition-colors'
          )}
          aria-label="아래로 스크롤"
        >
          <span className="text-xs">Scroll</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M10 4v12M4 12l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      ) : null}
    </section>
  );
}
