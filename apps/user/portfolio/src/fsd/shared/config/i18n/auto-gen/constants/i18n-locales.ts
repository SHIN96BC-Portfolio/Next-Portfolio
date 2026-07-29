/** ✅ 자동 생성된 파일입니다. 수동으로 수정하지 마세요.(i18n/scripts/generate.ts 파일로 생성) */ 

export const I18N_LOCALE = {
  EN: 'en',
  JA: 'ja',
  KO: 'ko',
} as const;

export const I18N_LOCALE_OPTIONS = [
  { label: 'English', value: 'en' },
  { label: '한국어', value: 'ko' },
  { label: '日本語', value: 'ja' },
];

export const supportedLocales = ['en', 'ja', 'ko']; // 지원하는 언어 목록

// 지원하는 언어
export type Locale =
  typeof I18N_LOCALE[keyof typeof I18N_LOCALE];
