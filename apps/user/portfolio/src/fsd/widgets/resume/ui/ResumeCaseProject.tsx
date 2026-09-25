import { ResumeCase, ResumeProjectConfig } from '@FsdEntities/content/model/types';
import { DictionaryHome } from '@FsdShared/config/i18n/auto-gen/types/home';
import RenderMarkdownText from '@FsdShared/markdown/ui/RenderMarkdownText';
import mergeClassNames from '@FsdShared/utils/style/merge-class-names';

type Labels = DictionaryHome['resume']['labels'];

interface Props {
  config: ResumeProjectConfig;
  labels: Labels;
}

const ROW_TEXT = 'min-w-0 break-words [overflow-wrap:anywhere] [&_p]:m-0 [&_strong]:font-semibold';
const INLINE_CODE = '[&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-px [&_code]:text-[12px]';
/** TO-BE 줄의 `inline code` 는 수치 배지 */
const METRIC_BADGE =
  '[&_code]:mx-0.5 [&_code]:rounded [&_code]:bg-foreground [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[11px] [&_code]:font-semibold [&_code]:text-background';

function CaseRow({ label, text, emphasis = false }: { label: string; text: string; emphasis?: boolean }) {
  return (
    <>
      <dt className="pt-px text-[11px] font-medium tracking-wide text-muted-foreground">{label}</dt>
      <dd
        className={mergeClassNames(
          ROW_TEXT,
          emphasis ? `font-semibold text-foreground ${METRIC_BADGE}` : `text-foreground/85 ${INLINE_CODE}`
        )}
      >
        <RenderMarkdownText text={text} />
      </dd>
    </>
  );
}

function CaseItem({ item, labels }: { item: ResumeCase; labels: Labels }) {
  return (
    <section className="resume-case">
      <h4 className="flex items-center gap-2 text-[14px] font-semibold text-foreground">
        <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/50" />
        {item.title}
      </h4>
      <dl className="mt-2 grid grid-cols-[3.25rem_1fr] gap-x-3 gap-y-1.5 pl-3.5 text-[13.5px] leading-6">
        <CaseRow label={labels.asIs} text={item.asIs} />
        <CaseRow label={labels.approach} text={item.approach} />
        {item.decision ? <CaseRow label={labels.decision} text={item.decision} /> : null}
        <CaseRow label={labels.toBe} text={item.toBe} emphasis />
      </dl>
    </section>
  );
}

export default function ResumeCaseProject({ config, labels }: Props) {
  return (
    <article className="resume-project resume-project--cases">
      <header className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border/70 pb-2">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-[16px] font-bold tracking-tight text-foreground">{config.title}</h3>
          {config.scopeTags?.map((tag) => (
            <span
              key={tag}
              className="rounded border border-border px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-xs tabular-nums text-muted-foreground">{config.period}</p>
      </header>

      {config.overview ? (
        <dl className="mb-4 grid grid-cols-[3.25rem_1fr] gap-x-3 text-[13.5px] leading-6">
          <CaseRow label={labels.overview} text={config.overview} />
        </dl>
      ) : null}

      {config.cases && config.cases.length > 0 ? (
        <div className="space-y-5">
          {config.cases.map((item) => (
            <CaseItem key={item.title} item={item} labels={labels} />
          ))}
        </div>
      ) : null}

      {config.techStack.length > 0 ? (
        <p className="mt-4 text-xs leading-5 text-muted-foreground">
          <span className="font-medium text-foreground/70">{labels.tech}</span>
          <span aria-hidden> — </span>
          {config.techStack.join(', ')}
        </p>
      ) : null}
    </article>
  );
}
