import Link from 'next/link';

interface Props {
  href: string;
  passHref?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function LinkBtn({ href, className, passHref, children }: Props) {
  return (
    <Link href={href} className={className} passHref={passHref}>
      {children}
    </Link>
  );
}
