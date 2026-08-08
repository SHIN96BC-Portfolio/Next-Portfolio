'use client';

import { ContentLang, ProjectGridConfig } from '@FsdEntities/content/model/types';
import ScrollReveal from '@FsdFeatures/scroll-reveal/ui/ScrollReveal';
import { AccordionItem } from '@FsdShared/accordion/ui';
import { DisplayVariant, isPrintVariant } from '@FsdShared/display/model/display-variant';
import { SectionHeader } from '@FsdShared/section-header/ui';
import formatEmploymentPeriod from '@FsdShared/utils/date/format-employment-period';
import { useState } from 'react';
import HighlightListItem from './HighlightListItem';

interface Props {
  title: string;
  config: ProjectGridConfig;
  lang: ContentLang;
  displayVariant?: DisplayVariant;
}

export default function PortfolioProjects({ title, config, lang, displayVariant = 'screen' }: Props) {
  if (isPrintVariant(displayVariant)) {
    return <PortfolioProjectsPrint title={title} config={config} lang={lang} />;
  }

  return <PortfolioProjectsScreen title={title} config={config} lang={lang} />;
}

function PortfolioProjectsPrint({ title, config, lang }: Omit<Props, 'displayVariant'>) {
  return (
    <section id="projects" className="print-section bg-muted/50">
      <div className="print-section__inner">
        <SectionHeader title={title} subtitle="회사별 주요 프로젝트와 기술적 성과" />

        <div className="mt-6 space-y-5">
          {config.companies.map((company) => (
            <article key={company.id} className="rounded-2xl border border-border bg-card p-6">
              <header>
                <h3 className="text-lg font-bold text-card-foreground">{company.name}</h3>
                <p className="mt-1 text-sm text-primary font-medium">{formatEmploymentPeriod(company.period, lang)}</p>
                {company.role ? <p className="mt-1 text-sm text-muted-foreground">{company.role}</p> : null}
              </header>

              <div className="mt-5 space-y-4">
                {company.projects.map((project) => (
                  <div key={project.id} className="rounded-xl border border-border bg-background p-5">
                    <h4 className="font-semibold text-foreground">{project.name}</h4>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {project.period} · {project.role}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">{project.summary}</p>

                    <ProjectDetailContent project={project} />
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioProjectsScreen({ title, config, lang }: Omit<Props, 'displayVariant'>) {
  const [openCompany, setOpenCompany] = useState<string | null>(config.companies[0]?.id ?? null);
  const [openProject, setOpenProject] = useState<string | null>('modetour');

  const toggleCompany = (id: string) => {
    setOpenCompany((prev) => (prev === id ? null : id));
    setOpenProject(null);
  };

  const toggleProject = (id: string) => {
    setOpenProject((prev) => (prev === id ? null : id));
  };

  return (
    <section id="projects" className="py-20 sm:py-28 bg-muted/50">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal variant="fade-up">
          <SectionHeader title={title} subtitle="회사별 주요 프로젝트와 기술적 성과" />
        </ScrollReveal>

        <div className="mt-12 space-y-4">
          {config.companies.map((company, companyIndex) => {
            const isCompanyOpen = openCompany === company.id;

            return (
              <ScrollReveal key={company.id} variant="fade-up" delay={companyIndex * 80}>
                <AccordionItem
                  variant="card"
                  isOpen={isCompanyOpen}
                  onToggle={() => toggleCompany(company.id)}
                  scrollOnOpen
                  trigger={
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-card-foreground">{company.name}</h3>
                      <p className="mt-1 text-sm text-primary font-medium">
                        {formatEmploymentPeriod(company.period, lang)}
                      </p>
                      {company.role && <p className="mt-1 text-sm text-muted-foreground">{company.role}</p>}
                    </div>
                  }
                >
                  <div className="space-y-3 pb-3">
                    {company.projects.map((project) => {
                      const isProjectOpen = openProject === project.id;

                      return (
                        <AccordionItem
                          key={project.id}
                          variant="nested"
                          isOpen={isProjectOpen}
                          onToggle={() => toggleProject(project.id)}
                          scrollOnOpen
                          trigger={
                            <div>
                              <h4 className="font-semibold text-foreground">{project.name}</h4>
                              <p className="mt-1 text-xs text-muted-foreground">
                                {project.period} · {project.role}
                              </p>
                              <p className="mt-2 text-sm text-muted-foreground">{project.summary}</p>
                            </div>
                          }
                        >
                          <div className="py-5">
                            <ProjectDetailContent project={project} />
                          </div>
                        </AccordionItem>
                      );
                    })}
                  </div>
                </AccordionItem>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectDetailContent({ project }: { project: ProjectGridConfig['companies'][number]['projects'][number] }) {
  return (
    <div className="space-y-5">
      <div>
        <h5 className="text-sm font-semibold text-foreground mb-2">주요 업무</h5>
        <ul className="space-y-2">
          {project.highlights.map((item) => (
            <HighlightListItem key={item} item={item} />
          ))}
        </ul>
      </div>

      {project.issues && project.issues.length > 0 ? (
        <div>
          <h5 className="text-sm font-semibold text-foreground mb-2">이슈 & 해결</h5>
          <ul className="space-y-1.5">
            {project.issues.map((item) => (
              <li
                key={item}
                className="text-sm text-muted-foreground flex gap-2 before:content-['→'] before:text-warning before:shrink-0"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div>
        <h5 className="text-sm font-semibold text-foreground mb-2">기술 스택</h5>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span key={tech} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {(project.linkGroups?.length ?? 0) > 0 ? (
        <div className="space-y-4">
          {project.linkGroups?.map((group) => (
            <div key={group.title}>
              <h5 className="text-sm font-semibold text-foreground mb-2">{group.title}</h5>
              <div className="flex flex-wrap gap-3">
                {group.links.map((link) => (
                  <a key={link.url} href={link.url} className="text-sm text-primary break-all">
                    {link.label} →
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {!project.linkGroups?.length && project.links && project.links.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {project.links.map((link) => (
            <a key={link.url} href={link.url} className="text-sm text-primary break-all">
              {link.label} →
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
