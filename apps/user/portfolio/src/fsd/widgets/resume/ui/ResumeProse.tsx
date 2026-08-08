import RenderMarkdownText from '@FsdShared/markdown/ui/RenderMarkdownText';
import mergeClassNames from '@FsdShared/utils/style/merge-class-names';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export function ResumeProse({ children, className }: Props) {
  return (
    <div
      className={mergeClassNames(
        'resume-prose text-[15px] leading-7 text-foreground/90 break-words [overflow-wrap:anywhere]',
        '[&_p]:mb-4 [&_p:last-child]:mb-0',
        '[&_strong]:font-semibold [&_strong]:text-foreground',
        '[&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2',
        '[&_li]:text-foreground/90',
        '[&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-sm',
        className
      )}
    >
      {children}
    </div>
  );
}

interface MarkdownProps {
  text: string;
  className?: string;
}

export function ResumeMarkdown({ text, className }: MarkdownProps) {
  return (
    <ResumeProse className={className}>
      <RenderMarkdownText text={text} />
    </ResumeProse>
  );
}
