import { SiteService } from '@FsdEntities/site/api';
import { SiteGnb } from '@FsdEntities/site/model/client/gnb';
import mapServerGnbToClient from '@FsdEntities/site/model/mapper/map-server-gnb-to-client';
import { serviceContainer } from '@FsdShared/config/service/service.setup';
import { SERVICE_NAME } from '@Libs/service-container';

export default async function fetchGnbSSR(): Promise<SiteGnb[]> {
  const service = serviceContainer.get<SiteService>(SERVICE_NAME.SITE);
  const response = await service.getGnb();

  return response.result ? mapServerGnbToClient(response.result) : [];
}
