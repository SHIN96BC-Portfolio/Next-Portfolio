export const SERVICE_BASE_NAME = {
  COMMON_BASE: Symbol.for('CommonBase'),
  FILE_BASE: Symbol.for('FileBase'),
};

export const SERVICE_NAME = {
  SITE: Symbol.for('Site'),
  CONTENT: Symbol.for('Content'),
};

export type BindingScopeType = 'Transient' | 'Singleton' | 'Request';

type BindingScope = {
  TRANSIENT: BindingScopeType;
  SINGLETON: BindingScopeType;
  REQUEST: BindingScopeType;
};

export const BINDING_SCOPE: BindingScope = {
  TRANSIENT: 'Transient', // 사용자마다 새로운 인스턴스 제공
  SINGLETON: 'Singleton', // 유일한 한개의 인스턴스 공유
  REQUEST: 'Request', // 들어오는 요청마다 인스턴스 생성 후 처리 완료되면 폐기
};

export default undefined;
