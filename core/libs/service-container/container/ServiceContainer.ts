import BaseBinding from '../binding/BaseBinding';
import Binding from '../binding/Binding';
import { BatchBaseBinding, BatchBinding } from '../service.type';

export default interface ServiceContainer {
  bind<T>(name: symbol): Binding<T>;
  baseBind<T>(name: symbol): BaseBinding<T>;
  batchBind(list: BatchBinding[]): void;
  batchBaseBind(list: BatchBaseBinding[]): void;
  unbind(name: symbol): void;
  baseUnbind(name: symbol): void;
  get<T>(name: symbol): T;
  isBound(name: symbol): boolean;
  setToken(token: string): Promise<void>;
  clearToken(): Promise<void>;
}
