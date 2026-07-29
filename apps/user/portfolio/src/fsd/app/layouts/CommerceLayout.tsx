import { SiteGnb } from '@FsdEntities/site/model/client/gnb';

interface Props {
  isLogin: boolean;
  gnbList: SiteGnb[];
  children: React.ReactNode;
}

export default function CommerceLayout({ children }: Props) {
  return <main>{children}</main>;
}
