import { MiddlewareContainerImpl } from '@FsdShared/libs/middleware/container/MiddlewareContainerImpl';
import { authMiddleHandler, loggerMiddleHandler } from '@FsdShared/libs/middleware/handlers';

export const middlewareContainer = new MiddlewareContainerImpl()
  .use('auth', authMiddleHandler)
  .use('logger', loggerMiddleHandler)
  .compose('/admin', ['auth', 'logger'])
  .compose('/dashboard', ['auth'])
  .compose('/', ['logger']);

export default undefined;
