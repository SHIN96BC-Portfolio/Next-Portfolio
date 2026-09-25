import { ResumeEmployer } from '@FsdEntities/content/model/types';

interface Props {
  company: string;
  employer: ResumeEmployer;
}

/** 같은 소속 회사의 프로젝트들 위에 한 번 그리는 회사 헤더 */
export default function ResumeEmployerHeader({ company, employer }: Props) {
  return (
    <header className="resume-employer border-b-2 border-foreground/80 pb-2">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="text-lg font-bold tracking-tight text-foreground">{company}</h2>
        <p className="text-xs tabular-nums text-muted-foreground">{employer.period}</p>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{employer.detail}</p>
    </header>
  );
}
