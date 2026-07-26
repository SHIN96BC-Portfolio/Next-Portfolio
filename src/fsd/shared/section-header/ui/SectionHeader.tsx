interface Props {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionHeader({ title, subtitle, align = 'left' }: Props) {
  return (
    <div className={align === 'center' ? 'text-center' : 'text-left'}>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{title}</h2>
      <div className={`mt-3 h-1 w-12 rounded-full bg-primary ${align === 'center' ? 'mx-auto' : ''}`} aria-hidden />
      {subtitle && <p className="mt-4 text-muted-foreground text-base sm:text-lg">{subtitle}</p>}
    </div>
  );
}
