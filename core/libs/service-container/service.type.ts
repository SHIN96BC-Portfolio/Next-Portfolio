import { BindingScopeType } from './service-constants';

export type Constructor<T> = new (...args: any[]) => T;

type CommonBatch = {
  name: symbol;
  target: Constructor<any>;
};

// 서비스용: baseName 필수
export type BatchBinding = CommonBatch & {
  baseName: symbol;
  scope?: BindingScopeType;
};

// 베이스용: baseName 금지
export type BatchBaseBinding = CommonBatch & {
  baseName?: never;
  scope?: never;
};
