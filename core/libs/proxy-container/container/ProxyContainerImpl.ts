import ProxyChain from '@Libs/proxy-container/chain/ProxyChain';
import ProxyChainImpl from '@Libs/proxy-container/chain/ProxyChainImpl';
import { Proxy, ProxyChainOption, ProxyChainValue } from '@Libs/proxy-container/proxy.type';
import { mergeUniquePreserveOrder } from '@Libs/utils/merge-unique-preserve-order';
import ProxyContainer from './ProxyContainer';

const globalChainName = 'Global';

/**
 * 미들웨어를 등록하고 이름 기반으로 체인을 구성/해결하는 컨테이너 클래스
 */
export class ProxyContainerImpl implements ProxyContainer {
  // 미들웨어를 이름으로 등록하는 레지스트리
  private registry = new Map<string, Proxy>();

  // 체인 이름과 그에 속한 미들웨어 이름 목록
  private chains = new Map<string, ProxyChainValue>();

  /**
   * 미들웨어 등록 메서드
   * @param name - 등록할 미들웨어의 고유 이름
   * @param proxy - 실행할 미들웨어 함수
   * @returns this (체이닝 가능)
   */
  use(name: string, proxy: Proxy) {
    this.registry.set(name, proxy);
    return this;
  }

  /**
   * 여러 미들웨어를 조합해서 체인을 구성하는 메서드
   * @param name - 체인 이름
   * @param proxyNames - 해당 체인에 포함될 미들웨어 이름 목록
   * @param options{ProxyChainOption} - 해당 체인에 적용할 옵션
   * @returns this (체이닝 가능)
   */
  compose(name: string, proxyNames: string[], options?: ProxyChainOption) {
    this.chains.set(name, { values: proxyNames, options });
    return this;
  }

  /**
   * 여러 미들웨어를 조합해서 체인을 구성하는 메서드(모든 상황에 실행되어야 하는 미들웨어)
   * @param proxyNames - 해당 체인에 포함될 미들웨어 이름 목록
   * @returns this (체이닝 가능)
   */
  composeGlobal(proxyNames: string[]) {
    this.chains.set(globalChainName, { values: proxyNames });
    return this;
  }

  /**
   * 구성된 체인을 실행 가능한 ProxyChain 인스턴스로 변환
   * @param name - 체인 이름
   * @returns 실행 가능한 ProxyChain 인스턴스
   */
  resolve(name: string): ProxyChain | null {
    const proxies = this.chains.get(name)?.values?.map((n) => this.registry.get(n)!) ?? [];
    const globalProxies = this.chains.get(globalChainName)?.values?.map((n) => this.registry.get(n)!) ?? [];

    const combined = mergeUniquePreserveOrder<Proxy>([globalProxies, proxies]);

    if (combined.length === 0) return null;

    return new ProxyChainImpl(combined);
  }

  /**
   * 주어진 경로(path)에 가장 먼저 매칭되는 체인을 반환
   * @param path - 경로
   * @returns 매칭된 ProxyChain 인스턴스 or null
   */
  resolveByPath(path: string): ProxyChain | null {
    const entry = Array.from(this.chains.entries()).find(([prefix, value]) => {
      const matchType = value?.options?.matchType ?? 'exact';

      switch (matchType) {
        case 'endsWith':
          return path.endsWith(prefix);
        case 'startsWith':
          return path.startsWith(prefix);
        case 'includes':
          return path.includes(prefix);
        case 'exact':
        default:
          return path === prefix;
      }
    });

    const name = entry && Array.isArray(entry) && entry.length > 0 ? entry[0] : '';

    return this.resolve(name); // 해당 prefix로 resolve
  }
}
