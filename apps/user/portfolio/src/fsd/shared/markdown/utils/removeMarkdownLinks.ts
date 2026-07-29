/**
 * 마크다운 문자열에서 특정 링크만 제거하고 텍스트만 남긴다.
 * 예: [텍스트](https://www.google.com//...) → 텍스트
 */
export default function removeMarkdownLinks(url: string, markdown: string): string {
  if (!markdown || !url) return markdown;

  let hostname = '';

  try {
    hostname = new URL(url).hostname.replace(/^www\./, ''); // 'www.' 제거
  } catch (e) {
    return markdown;
  }

  const escapedHost = hostname.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // 정규식: www. 있어도 없어도 매칭
  const linkRegex = new RegExp(`\\[([^\\]]+)]\\((https?:\\/\\/(?:www\\.)?${escapedHost}[^)]+)\\)`, 'g');

  return markdown.replace(linkRegex, '$1');
}
