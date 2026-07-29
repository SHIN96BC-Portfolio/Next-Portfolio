import { ContentServiceImpl } from '@FsdEntities/content/api';
import { SiteServiceImpl } from '@FsdEntities/site/api';
import {
  BatchBaseBinding,
  BatchBinding,
  BINDING_SCOPE,
  CommonServiceBaseImpl,
  FileServiceBaseImpl,
  SERVICE_BASE_NAME,
  SERVICE_NAME,
  ServiceContainer,
  ServiceContainerImpl,
} from '@Libs/service-container';

const serviceBatchBaseList: BatchBaseBinding[] = [
  { name: SERVICE_BASE_NAME.COMMON_BASE, target: CommonServiceBaseImpl },
  { name: SERVICE_BASE_NAME.FILE_BASE, target: FileServiceBaseImpl },
];

const serviceBatchList: BatchBinding[] = [
  {
    name: SERVICE_NAME.SITE,
    target: SiteServiceImpl,
    baseName: SERVICE_BASE_NAME.COMMON_BASE,
    scope: BINDING_SCOPE.SINGLETON,
  },
  {
    name: SERVICE_NAME.CONTENT,
    target: ContentServiceImpl,
    baseName: SERVICE_BASE_NAME.COMMON_BASE,
    scope: BINDING_SCOPE.SINGLETON,
  },
];

/**
 * Service Container Instance
 * @type {ServiceContainer}
 */
const serviceContainer: ServiceContainer = new ServiceContainerImpl();

/// ///////////////////////////////////////////////////////////////////////////////////////////////
// region - Dependency Injection
/// ///////////////////////////////////////////////////////////////////////////////////////////////

/** * Bind Service Base */
// serviceContainer
//   .baseBind<CommonServiceBase>(SERVICE_BASE_NAME.COMMON_BASE)
//   .to(CommonServiceBaseImpl)
//   .inSingletonScope()
//   .build();

// serviceContainer
//   .baseBind<FileServiceBase>(SERVICE_BASE_NAME.FILE_BASE)
//   .to(FileServiceBaseImpl)
//   .inSingletonScope()
//   .build();

/** * Bind Service */
// service 하나씩 수동 등록
// serviceContainer
//   .bind<SiteService>(SERVICE_NAME.SITE)
//   .to(SiteServiceImpl)
//   .base(SERVICE_BASE_NAME.COMMON_BASE)
//   .inSingletonScope()
//   .build();

// service base 한번에 batch 등록
serviceContainer.batchBaseBind(serviceBatchBaseList ?? []);
// service 한번에 batch 등록
serviceContainer.batchBind(serviceBatchList ?? []);

/// ///////////////////////////////////////////////////////////////////////////////////////////////
// endregion - Dependency Injection
/// ///////////////////////////////////////////////////////////////////////////////////////////////

export { serviceContainer };

export default undefined;
