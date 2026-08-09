/**
 * i18n 공용 barrel (Server Component / Server Action 용).
 *
 * - 현재는 `client.ts`만 re-export합니다.
 * - Client Component는 `@FsdShared/config/i18n/client`를 사용하세요.
 * - 서버 번역 로더는 `@FsdShared/config/i18n/utils/get-i18n-translator`에서 직접 import하세요.
 */
export * from './client';
