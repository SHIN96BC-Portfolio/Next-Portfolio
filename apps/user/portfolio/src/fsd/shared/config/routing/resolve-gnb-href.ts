import { Locale } from '@FsdShared/config/i18n';
import { supportedLocales } from '@FsdShared/config/i18n/auto-gen/constants/i18n-locales';

/** GNB link_url(`/resume`) → `/{lang}/resume` */
export function resolveGnbHref(path: string, lang: string): string {
  if (!path || path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const normalized = path.startsWith('/') ? path : `/${path}`;
  const segments = normalized.split('/').filter(Boolean);

  if (segments.length > 0 && supportedLocales.includes(segments[0] as Locale)) {
    return normalized;
  }

  if (normalized === '/') {
    return `/${lang}`;
  }

  return `/${lang}${normalized}`;
}

/** 현재 pathname 과 GNB href 가 같은 페이지인지 */
export function isGnbLinkActive(pathname: string, gnbPath: string, lang: string): boolean {
  const href = resolveGnbHref(gnbPath, lang);
  const normalizedPath = pathname.replace(/\/$/, '') || `/${lang}`;
  const normalizedHref = href.replace(/\/$/, '') || `/${lang}`;

  return normalizedPath === normalizedHref;
}
