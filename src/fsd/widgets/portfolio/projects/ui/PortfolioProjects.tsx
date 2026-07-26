'use client';

import { ProjectGridConfig } from '@FsdEntities/content/model/types';
import ScrollReveal from '@FsdFeatures/scroll-reveal/ui/ScrollReveal';
import { AccordionItem } from '@FsdShared/accordion/ui';
import { SectionHeader } from '@FsdShared/section-header/ui';
import { useState } from 'react';
import HighlightListItem from './HighlightListItem';

interface Props {
  title: string;
  config: ProjectGridConfig;
}

export default function PortfolioProjects({ title, config }: Props) {
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
                  contentClassName="space-y-3"
                  scrollOnOpen
                  trigger={
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-card-foreground">{company.name}</h3>
                      <p className="mt-1 text-sm text-primary font-medium">{company.period}</p>
                      {company.role && <p className="mt-1 text-sm text-muted-foreground">{company.role}</p>}
                    </div>
                  }
                >
                  {company.projects.map((project) => {
                    const isProjectOpen = openProject === project.id;

                    return (
                      <AccordionItem
                        key={project.id}
                        variant="nested"
                        isOpen={isProjectOpen}
                        onToggle={() => toggleProject(project.id)}
                        contentClassName="space-y-5"
                        scrollOnOpen
                        trigger={
                          <div>
                            <h4 className="font-semibold text-foreground">{project.name}</h4>
                            <p className="mt-1 text-xs text-muted-foreground">
                              {project.period} · {project.role}
                            </p>
                            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{project.summary}</p>
                          </div>
                        }
                      >
                        <div>
                          <h5 className="text-sm font-semibold text-foreground mb-2">주요 업무</h5>
                          <ul className="space-y-2">
                            {project.highlights.map((item) => (
                              <HighlightListItem key={item} item={item} />
                            ))}
                          </ul>
                        </div>

                        {project.issues && project.issues.length > 0 && (
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
                        )}

                        <div>
                          <h5 className="text-sm font-semibold text-foreground mb-2">기술 스택</h5>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {project.links && project.links.length > 0 && (
                          <div className="flex flex-wrap gap-3">
                            {project.links.map((link) => (
                              <a
                                key={link.url}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-primary hover:underline"
                              >
                                {link.label} →
                              </a>
                            ))}
                          </div>
                        )}
                      </AccordionItem>
                    );
                  })}
                </AccordionItem>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
