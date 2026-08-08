import mergeClassNames from '@FsdShared/utils/style/merge-class-names';
import Link from 'next/link';

interface Props {
  label: string;
  href: string;
  fullWidth?: boolean;
}

export default function PortfolioPrintButton({ label, href, fullWidth = false }: Props) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={mergeClassNames(
        'no-print rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-accent',
        fullWidth && 'flex w-full justify-center rounded-xl py-2.5'
      )}
    >
      {label}
    </Link>
  );
}
