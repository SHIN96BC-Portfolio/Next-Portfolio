import { serviceContainer } from '@FsdShared/config/service/service.setup';
import { SERVICE_KEY } from '@FsdShared/config/service/service-map';
import { CommonRes } from '@core/service-container';
import { SiteGnb } from '../model/client/gnb';
import mapServerGnbToClient from '../model/mapper/map-server-gnb-to-client';

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
      const service = serviceContainer.get(SERVICE_KEY.SITE);
      const response = await service.getGnb();

      return {
        ...response,
        result: response.result ? mapServerGnbToClient(response.result) : undefined,
      };
    },
  }),
};

export default queryOptions;
