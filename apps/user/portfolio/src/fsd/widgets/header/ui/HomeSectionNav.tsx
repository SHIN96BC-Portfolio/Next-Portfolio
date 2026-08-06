'use client';

import { DictionaryHome } from '@FsdShared/config/i18n/auto-gen/types/home';
import mergeClassNames from '@FsdShared/utils/style/merge-class-names';
import { useEffect, useMemo, useState } from 'react';

const SECTION_IDS = ['introduction', 'about', 'projects', 'career', 'skills', 'contact'] as const;

interface Props {
  homeDict: DictionaryHome;
}

/** 홈 랜딩 전용 2차 nav — 같은 페이지 내 섹션 scroll */
export default function HomeSectionNav({ homeDict }: Props) {
  const [activeSection, setActiveSection] = useState('');

  const sectionLinks = useMemo(
    () =>
      SECTION_IDS.map((id) => ({
        id,
        label: homeDict.nav[id],
      })),
    [homeDict.nav]
  );

  useEffect(() => {
    const HEADER_OFFSET = 112;
    const ACTIVATION_LINE = HEADER_OFFSET + 80;

    const updateActiveSection = () => {
      const sectionElements = sectionLinks.flatMap((link) => {
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
  }, [sectionLinks]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    setActiveSection(id);

    const top = element.getBoundingClientRect().top + window.scrollY - 112;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <nav
      className="hidden border-t border-border/50 md:flex items-center justify-center gap-1 px-6 py-2"
      aria-label="section navigation"
    >
      {sectionLinks.map((link) => (
        <button
          key={link.id}
          type="button"
          onClick={() => scrollTo(link.id)}
          className={mergeClassNames(
            'rounded-full px-2.5 py-1 text-xs sm:text-sm transition-colors',
            activeSection === link.id
              ? 'bg-primary/10 text-primary font-medium'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
          )}
        >
          {link.label}
        </button>
      ))}
    </nav>
  );
}
