import nextAuthOptions from '@FsdApp/auth/config/next-auth';
import CommerceLayout from '@FsdApp/layouts/CommerceLayout';
import { getServerSession } from 'next-auth';

interface Props {
  children: React.ReactNode;
}

export default async function CommercePageLayout({ children }: Props) {
  const session = await getServerSession(nextAuthOptions);

  return (
    <CommerceLayout isLogin={!!session?.accessToken} gnbList={[]}>
      {children}
    </CommerceLayout>
  );
}
