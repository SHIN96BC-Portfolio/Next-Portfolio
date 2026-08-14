import { ContentServiceImpl } from '@FsdEntities/content/api';
import { SiteServiceImpl } from '@FsdEntities/site/api';
import {
  BINDING_SCOPE,
  CommonServiceBaseImpl,
  createTypedServiceContainer,
  FileServiceBaseImpl,
  SERVICE_BASE_NAME,
} from '@core/service-container';
import { AppServiceMap, SERVICE_KEY } from './service-map';

const serviceContainer = createTypedServiceContainer<AppServiceMap>();

serviceContainer.batchBaseBind([
  { name: SERVICE_BASE_NAME.COMMON_BASE, target: CommonServiceBaseImpl },
  { name: SERVICE_BASE_NAME.FILE_BASE, target: FileServiceBaseImpl },
]);

serviceContainer.bind(SERVICE_KEY.SITE, SiteServiceImpl, {
  baseName: SERVICE_BASE_NAME.COMMON_BASE,
  scope: BINDING_SCOPE.SINGLETON,
});

serviceContainer.bind(SERVICE_KEY.CONTENT, ContentServiceImpl, {
  baseName: SERVICE_BASE_NAME.COMMON_BASE,
  scope: BINDING_SCOPE.SINGLETON,
});

export { serviceContainer };

export default undefined;
