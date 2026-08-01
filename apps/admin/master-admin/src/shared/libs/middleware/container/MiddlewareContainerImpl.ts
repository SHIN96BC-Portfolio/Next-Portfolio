import MiddlewareChain from '@Src/shared/libs/middleware/chain/MiddlewareChain';
import MiddlewareChainImpl from '@Src/shared/libs/middleware/chain/MiddlewareChainImpl';
import { Middleware } from '@Src/shared/libs/middleware/middleware-type';
import { MiddlewareContainer } from './MiddlewareContainer';

/**
 * 미들웨어를 등록하고 이름 기반으로 체인을 구성/해결하는 컨테이너 클래스
 */
export class MiddlewareContainerImpl implements MiddlewareContainer {
  // 미들웨어를 이름으로 등록하는 레지스트리
  private registry = new Map<string, Middleware>();

  // 체인 이름과 그에 속한 미들웨어 이름 목록
  private chains = new Map<string, string[]>();

  /**
   * 미들웨어 등록 메서드
   * @param name - 등록할 미들웨어의 고유 이름
   * @param middleware - 실행할 미들웨어 함수
   * @returns this (체이닝 가능)
   */
  use(name: string, middleware: Middleware) {
    this.registry.set(name, middleware);
    return this;
  }

  /**
   * 여러 미들웨어를 조합해서 체인을 구성하는 메서드
   * @param name - 체인 이름
   * @param middlewareNames - 해당 체인에 포함될 미들웨어 이름 목록
   * @returns this (체이닝 가능)
   */
  compose(name: string, middlewareNames: string[]) {
    this.chains.set(name, middlewareNames);
    return this;
  }

  /**
   * 구성된 체인을 실행 가능한 MiddlewareChain 인스턴스로 변환
   * @param name - 체인 이름
   * @returns 실행 가능한 MiddlewareChain 인스턴스
   */
  resolve(name: string): MiddlewareChain {
    const mws = this.chains.get(name)?.map((n) => this.registry.get(n)!);
    return new MiddlewareChainImpl(mws ?? []);
  }

  /**
   * 주어진 경로(path)에 가장 먼저 매칭되는 체인을 반환
   * @param path - 경로
   * @returns 매칭된 MiddlewareChain 인스턴스 or null
   */
  resolveByPath(path: string): MiddlewareChain | null {
    const entry = Array.from(this.chains.entries()).find(([prefix]) => path.startsWith(prefix));
    if (!entry) {
      return null;
    }

    return this.resolve(entry[0]); // 해당 prefix로 resolve
  }
}
