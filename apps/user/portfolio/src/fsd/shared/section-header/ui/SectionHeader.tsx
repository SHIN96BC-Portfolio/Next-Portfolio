import { type ReactNode } from 'react';

interface Props {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  trailing?: ReactNode;
}

export default function SectionHeader({ title, subtitle, align = 'left', trailing }: Props) {
  return (
    <div className={align === 'center' ? 'text-center' : 'text-left'}>
      <div
        className={`flex flex-wrap items-baseline gap-x-4 gap-y-2 ${align === 'center' ? 'justify-center' : 'justify-between'}`}
      >
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{title}</h2>
        {trailing}
      </div>
      <div className={`mt-3 h-1 w-12 rounded-full bg-primary ${align === 'center' ? 'mx-auto' : ''}`} aria-hidden />
      {subtitle && <p className="mt-4 text-muted-foreground text-base sm:text-lg">{subtitle}</p>}
    </div>
  );
}
