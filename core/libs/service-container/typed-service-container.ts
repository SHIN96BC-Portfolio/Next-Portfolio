import ServiceContainerImpl from './container/ServiceContainerImpl';
import { BatchBaseBinding, Constructor } from './service.type';
import { BINDING_SCOPE, type BindingScopeType } from './service-constants';

export type TypedBindOptions = {
  baseName: symbol;
  scope?: BindingScopeType;
};

export interface TypedServiceContainer<TMap extends Record<string, unknown>> {
  batchBaseBind(list: BatchBaseBinding[]): void;
  bind<K extends keyof TMap & string>(name: K, target: Constructor<TMap[K]>, options: TypedBindOptions): void;
  get<K extends keyof TMap & string>(name: K): TMap[K];
  setToken(token: string): Promise<void>;
  clearToken(): Promise<void>;
}

const toServiceSymbol = (name: string): symbol => Symbol.for(`@core/service-container:${name}`);

class TypedServiceContainerImpl<TMap extends Record<string, unknown>> implements TypedServiceContainer<TMap> {
  private readonly inner = new ServiceContainerImpl();

  batchBaseBind(list: BatchBaseBinding[]): void {
    this.inner.batchBaseBind(list);
  }

  bind<K extends keyof TMap & string>(name: K, target: Constructor<TMap[K]>, options: TypedBindOptions): void {
    const serviceSymbol = toServiceSymbol(name);

    if (this.inner.isBound(serviceSymbol)) {
      throw new Error(`Service "${name}" already bound`);
    }

    const binding = this.inner.bind<TMap[K]>(serviceSymbol);
    binding.to(target).base(options.baseName);

    switch (options.scope ?? BINDING_SCOPE.SINGLETON) {
      case BINDING_SCOPE.REQUEST:
        binding.inRequestScope();
        break;
      case BINDING_SCOPE.TRANSIENT:
        binding.inTransientScope();
        break;
      default:
        binding.inSingletonScope();
    }

    binding.build();
  }

  get<K extends keyof TMap & string>(name: K): TMap[K] {
    return this.inner.get<TMap[K]>(toServiceSymbol(name));
  }

  setToken(token: string): Promise<void> {
    return this.inner.setToken(token);
  }

  clearToken(): Promise<void> {
    return this.inner.clearToken();
  }
}

export function createTypedServiceContainer<TMap extends Record<string, unknown>>(): TypedServiceContainer<TMap> {
  return new TypedServiceContainerImpl<TMap>();
}
