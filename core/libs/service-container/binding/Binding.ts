import { Constructor } from '@Libs/service-container/service.type';
import { BindingScopeType } from '@Libs/service-container/service-constants';

export default interface Binding<T> {
  id: number;
  readonly name: symbol;
  baseName?: symbol;
  scope: BindingScopeType;
  getInstance(base?: unknown): T;
  inTransientScope(): this;
  inSingletonScope(): this;
  inRequestScope(): this;
  to(target: Constructor<T>): this;
  base(name: symbol): this;
  build(): void;
}
