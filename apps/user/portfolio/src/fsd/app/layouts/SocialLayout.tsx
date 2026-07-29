import { SiteGnb } from '@FsdEntities/site/model/client/gnb';

interface Props {
  isLogin: boolean;
  gnbList: SiteGnb[];
  children: React.ReactNode;
}

export default function SocialLayout({ children }: Props) {
  return <main>{children}</main>;
}
