import { ProxyContainerImpl } from '@Libs/proxy-container';
import { authProxyHandler, localeProxyHandler, loggerProxyHandler, themeProxyHandler } from './handlers';

export const proxyContainer = new ProxyContainerImpl()
  .use('auth', authProxyHandler)
  .use('logger', loggerProxyHandler)
  .use('locales', localeProxyHandler)
  .use('theme', themeProxyHandler)
  .compose('/my-page', ['auth'], { matchType: 'startsWith' })
  .composeGlobal(['locales', 'theme', 'logger']);

export default undefined;
