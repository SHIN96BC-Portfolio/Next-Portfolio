/* eslint-disable */
// ✅ 이 파일은 자동 생성된 파일입니다. 수동으로 수정하지 마세요.

export const I18N_LOCALE = {
  EN: 'en',
  KO: 'ko',
} as const;

// 지원하는 언어
export type Locale = (typeof I18N_LOCALE)[keyof typeof I18N_LOCALE];
