import ProxyChain from '../chain/ProxyChain';
import { Proxy, ProxyChainOption } from '../proxy.type';

export default interface ProxyContainer {
  use(name: string, proxy: Proxy): this;

  compose(name: string, proxyNames: string[], options?: ProxyChainOption): this;

  composeGlobal(proxyNames: string[]): this;

  resolve(chainName: string): ProxyChain | null;

  resolveByPath(path: string): ProxyChain | null;
}
