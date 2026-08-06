'use client';

import { ResumeProjectConfig } from '@FsdEntities/content/model/types';
import { DictionaryHome } from '@FsdShared/config/i18n/auto-gen/types/home';
import { ResumeMarkdown } from '@FsdWidgets/resume/ui/ResumeProse';

interface Props {
  config: ResumeProjectConfig;
  labels: DictionaryHome['resume']['labels'];
}

export default function ResumeProjectDocument({ config, labels }: Props) {
  const heading = config.orderLabel ? `${config.orderLabel}. ${config.title}` : config.title;

  return (
    <article className="resume-project border-b border-border/70 pb-10 last:border-b-0 last:pb-0">
      <header className="mb-5">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">{heading}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          <span className="text-foreground/80">{config.company}</span>
          <span aria-hidden> · </span>
          <span>{config.period}</span>
          <span aria-hidden> · </span>
          <span>{config.role}</span>
        </p>
        {config.links.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {config.links.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline break-all"
                >
                  {link.label || link.url}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      <section className="mb-6">
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">{labels.problem}</h3>
        <ResumeMarkdown text={config.problem} />
      </section>

      {config.workSections.map((section) => (
        <section key={section.title} className="mb-6">
          <h3 className="mb-2 text-sm font-semibold text-foreground">{section.title}</h3>
          <ul className="space-y-2 text-[15px] leading-7 text-foreground/90">
            {section.items.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
                <ResumeMarkdown text={item} className="flex-1 [&_p]:mb-0" />
              </li>
            ))}
          </ul>
        </section>
      ))}

      {config.outcomes.length > 0 ? (
        <section className="mb-6">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {labels.outcomes}
          </h3>
          <ul className="space-y-2 text-[15px] leading-7 text-foreground/90">
            {config.outcomes.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                <ResumeMarkdown text={item} className="flex-1 [&_p]:mb-0" />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {config.extraSections?.map((section) => (
        <section key={section.title} className="mb-6">
          <h3 className="mb-2 text-sm font-semibold text-foreground">{section.title}</h3>
          {section.body ? <ResumeMarkdown text={section.body} className="mb-3" /> : null}
          {section.items && section.items.length > 0 ? (
            <ul className="space-y-2 text-[15px] leading-7 text-foreground/90">
              {section.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
                  <ResumeMarkdown text={item} className="flex-1 [&_p]:mb-0" />
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}

      {config.techStack.length > 0 ? (
        <footer className="mt-6 pt-4 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground/80">{labels.techStack}</span>
            <span aria-hidden> — </span>
            {config.techStack.join(', ')}
          </p>
        </footer>
      ) : null}
    </article>
  );
}
