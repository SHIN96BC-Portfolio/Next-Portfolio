import { MarkdownConfig } from '@FsdEntities/content/model/types';
import { ResumeMarkdown } from '@FsdWidgets/resume/ui/ResumeProse';

interface Props {
  title: string | null;
  config: MarkdownConfig;
  variant: 'intro' | 'section';
}

export default function ResumeMarkdownBlock({ title, config, variant }: Props) {
  if (variant === 'intro') {
    return (
      <header className="resume-intro border-b border-border pb-8">
        {title ? <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">{title}</h1> : null}
        <div className={title ? 'mt-5' : undefined}>
          <ResumeMarkdown text={config.body} />
        </div>
      </header>
    );
  }

  return (
    <section className="resume-section">
      {title ? <h2 className="text-lg font-semibold text-foreground mb-4">{title}</h2> : null}
      <ResumeMarkdown text={config.body} />
    </section>
  );
}
