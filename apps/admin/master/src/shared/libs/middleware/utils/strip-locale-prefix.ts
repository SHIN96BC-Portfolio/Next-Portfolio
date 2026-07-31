import { supportedLocales } from '@Src/shared/libs/middleware/middleware-constants';

/**
 * 경로에서 언어(locale) prefix를 제거하는 함수
 *
 * 예:
 *   "/ko/admin"  → "/admin"
 *   "/en"        → "" (홈 경로)
 *   "/admin"     → "/admin" (변경 없음)
 *
 * @param pathname - Next.js 요청의 pathname (ex. "/en/admin", "/ko", "/dashboard")
 * @returns 언어 prefix가 제거된 경로 (ex. "/admin")
 */
export default function stripLocalePrefix(pathname: string): string {
  // 경로를 '/' 기준으로 쪼갠 뒤, 빈 값 제거
  // "/ko/admin" → ['ko', 'admin']
  const segments = pathname.split('/').filter(Boolean);

  // 첫 번째 세그먼트가 언어 코드인지 확인
  const first = segments[0];

  // 언어 prefix가 있으면 제거하고 나머지 경로 반환
  if (supportedLocales.includes(first)) {
    return '/' + segments.slice(1).join('/');
  }

  // 언어 prefix가 없으면 원래 경로 그대로 반환
  return pathname;
}
