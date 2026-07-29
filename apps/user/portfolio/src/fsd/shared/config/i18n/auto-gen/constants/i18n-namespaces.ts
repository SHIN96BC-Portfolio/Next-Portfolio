/** ✅ 자동 생성된 파일입니다. 수동으로 수정하지 마세요.(i18n/scripts/generate.ts 파일로 생성) */ 

export const I18N_DICTIONARY_NAMESPACE = {
  COMMON: 'common',
  HOME: 'home',
} as const;

// 지원하는 페이지
export type Namespace = (typeof I18N_DICTIONARY_NAMESPACE)[keyof typeof I18N_DICTIONARY_NAMESPACE];
