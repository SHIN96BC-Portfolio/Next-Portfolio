import nextAuthOptions from '@FsdApp/auth/config/next-auth';
import FashionLayout from '@FsdApp/layouts/FashionLayout';
import { getServerSession } from 'next-auth';

interface Props {
  children: React.ReactNode;
}

export default async function FashionPageLayout({ children }: Props) {
  const session = await getServerSession(nextAuthOptions);

  return (
    <FashionLayout isLogin={!!session?.accessToken} gnbList={[]}>
      {children}
    </FashionLayout>
  );
}
