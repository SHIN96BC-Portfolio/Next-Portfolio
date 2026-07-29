import ProxyChain from '@Libs/proxy-container/chain/ProxyChain';
import { Proxy, ProxyChainOption } from '@Libs/proxy-container/proxy.type';

export default interface ProxyContainer {
  use(name: string, proxy: Proxy): this;

  compose(name: string, proxyNames: string[], options?: ProxyChainOption): this;

  composeGlobal(proxyNames: string[]): this;

  resolve(chainName: string): ProxyChain | null;

  resolveByPath(path: string): ProxyChain | null;
}
