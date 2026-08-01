import { SiteGnb } from '@Src/entities/site/model/client/gnb';
import { GnbGetRes } from '@Src/entities/site/model/server';

export default function mapServerGnbToClient(gnbList: GnbGetRes[]): SiteGnb[] {
  if (!gnbList || !Array.isArray(gnbList)) {
    return [];
  }

  return gnbList.map(
    (gnb): SiteGnb => ({
      id: gnb.id,
      name: gnb.name,
      path: gnb.path,
      icon: gnb.icon,
      children: Array.isArray(gnb.children) && gnb.children.length > 0 ? mapServerGnbToClient(gnb.children) : undefined,
    })
  );
}
