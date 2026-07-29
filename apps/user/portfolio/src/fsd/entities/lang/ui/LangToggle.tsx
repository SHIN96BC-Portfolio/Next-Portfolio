'use client';

import { I18N_LOCALE_OPTIONS, Locale, supportedLocales } from '@FsdShared/config/i18n/auto-gen/constants/i18n-locales';
import { defaultLocale } from '@FsdShared/config/proxy/model';
import SelectBox from '@FsdShared/select-box/ui/SelectBox';
import { useParams, usePathname, useRouter } from 'next/navigation';

function replaceLangInPath(pathname: string, to: Locale) {
  const parts = pathname.split('/'); // e.g. ['', 'ko', 'about']
  // parts[0] === '' (leading slash)
  if (supportedLocales.includes(parts[1] as Locale)) {
    parts[1] = to; // 교체
    return parts.join('/') || `/${to}`;
  }
  // 언어 세그먼트가 없다면 앞에 붙여주기
  return `/${to}${pathname.startsWith('/') ? '' : '/'}${pathname}`;
}

export default function LangToggle() {
  const router = useRouter();
  const pathname = usePathname() || '/';
  const params = useParams<{ lang: string }>();
  const currentLang =
    params?.lang && supportedLocales.includes(params.lang as Locale) ? (params.lang as Locale) : defaultLocale;

  return (
    <div className="inline-block">
      <SelectBox
        placeholder="언어 선택"
        options={I18N_LOCALE_OPTIONS}
        value={currentLang}
        onChange={(next) => {
          if (supportedLocales.includes(next)) {
            const nextPath = replaceLangInPath(pathname, next as Locale);
            router.push(nextPath);
            // 쿠키는 미들웨어에서 URL 기준으로 갱신됩니다.
          }
        }}
        size="sm"
        fullWidth={false}
        aria-label="언어 선택"
      />
    </div>
  );
}
