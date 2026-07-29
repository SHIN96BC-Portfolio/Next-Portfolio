/**
 * 정규식 특수문자를 escape 처리해 안전하게 정규식 패턴에 쓸 수 있도록 변환
 */
function escapeRegExp(str: string): string {
  return str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
}

/**
 * 특정 문자와 동일한 마크다운 헤더가 content 내에 있다면 모두 제거
 * 예: ## 예약확정\n\n → 제거
 * content가 null 또는 undefined일 경우 빈 문자열로 처리
 */
export default function removeMarkdownHeader(name: string, markdown?: string | null): string {
  const safeMarkdown = markdown ?? ''; // null 또는 undefined → ''
  const escapedName = escapeRegExp(name);
  const headerRegex = new RegExp(`^#+\\s*${escapedName}\\s*\\n\\s*\\n?`, 'm');

  return safeMarkdown.replace(headerRegex, '');
}
