import { SiteService } from '@FsdEntities/site/api';
import { SiteGnb } from '@FsdEntities/site/model/client/gnb';
import mapServerGnbToClient from '@FsdEntities/site/model/mapper/map-server-gnb-to-client';
import { serviceContainer } from '@FsdShared/config/service/service.setup';
import { CommonRes, SERVICE_NAME } from '@Libs/service-container';

/**
 * React Query Keys Object
 * @type {{findGnb: readonly [string]}}
 */
const queryKeys = {
  findGnb: ['findGnb'] as const,
};

const queryOptions = {
  findGnb: () => ({
    queryKey: queryKeys.findGnb,
    queryFn: async (): Promise<CommonRes<SiteGnb[]>> => {
      const service = serviceContainer.get<SiteService>(SERVICE_NAME.SITE);
      const response = await service.getGnb();

      return {
        ...response,
        result: response.result ? mapServerGnbToClient(response.result) : undefined,
      };
    },
  }),
};

export default queryOptions;
