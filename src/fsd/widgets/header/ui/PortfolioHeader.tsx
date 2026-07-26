'use client';

import LangToggle from '@FsdEntities/lang/ui/LangToggle';
import ThemeToggle from '@FsdEntities/theme/ui/ThemeToggle';
import { ThemeType } from '@FsdShared/config/theme/model/type';
import mergeClassNames from '@FsdShared/utils/style/merge-class-names';
import { useEffect, useState } from 'react';

const SECTION_LINKS = [
  { id: 'introduction', label: 'Intro' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'career', label: 'Career' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const;

interface Props {
  themeType: ThemeType;
}

export default function PortfolioHeader({ themeType }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const HEADER_OFFSET = 72;
    const ACTIVATION_LINE = HEADER_OFFSET + 80;

    const updateActiveSection = () => {
      const sectionElements = SECTION_LINKS.flatMap((link) => {
        const el = document.getElementById(link.id);
        return el ? [{ id: link.id, el }] : [];
      });

      if (sectionElements.length === 0) return;

      const hero = document.getElementById('hero');
      if (hero) {
        const heroBottom = hero.getBoundingClientRect().bottom;
        if (heroBottom > HEADER_OFFSET + 40) {
          setActiveSection('');
          return;
        }
      }

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY >= maxScroll - 2) {
        setActiveSection(sectionElements[sectionElements.length - 1].id);
        return;
      }

      let current = '';
      for (const section of sectionElements) {
        if (section.el.getBoundingClientRect().top <= ACTIVATION_LINE) {
          current = section.id;
        }
      }

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    setActiveSection(id === 'hero' ? '' : id);

    const top = element.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <header
      className={mergeClassNames(
        'sticky top-0 z-50 transition-all duration-300',
        isScrolled ? 'border-b border-border/60 bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <button
          type="button"
          onClick={() => scrollTo('hero')}
          className="text-lg font-bold tracking-tight text-foreground hover:text-primary transition-colors"
        >
          신병철
        </button>

        <nav className="hidden md:flex items-center gap-1" aria-label="섹션 네비게이션">
          {SECTION_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollTo(link.id)}
              className={mergeClassNames(
                'rounded-full px-3 py-1.5 text-sm transition-colors',
                activeSection === link.id
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              )}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LangToggle />
          <ThemeToggle themeType={themeType} />
        </div>
      </div>
    </header>
  );
}
