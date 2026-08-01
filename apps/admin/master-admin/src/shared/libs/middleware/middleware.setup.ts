import { MiddlewareContainerImpl } from '@Src/shared/libs/middleware/container/MiddlewareContainerImpl';
import { authMiddleHandler, loggerMiddleHandler } from '@Src/shared/libs/middleware/handlers';

export const middlewareContainer = new MiddlewareContainerImpl()
  .use('auth', authMiddleHandler)
  .use('logger', loggerMiddleHandler)
  .compose('/admin', ['auth', 'logger'])
  .compose('/dashboard', ['auth'])
  .compose('/', ['logger']);

export default undefined;
