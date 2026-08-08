'use client';

import { I18N_LOCALE_OPTIONS, Locale, supportedLocales } from '@FsdShared/config/i18n/auto-gen/constants/i18n-locales';
import { defaultLocale } from '@FsdShared/config/proxy/model';
import mergeClassNames from '@FsdShared/utils/style/merge-class-names';
import { useParams, usePathname, useRouter } from 'next/navigation';

function replaceLangInPath(pathname: string, to: Locale) {
  const parts = pathname.split('/');

  if (supportedLocales.includes(parts[1] as Locale)) {
    parts[1] = to;
    return parts.join('/') || `/${to}`;
  }

  return `/${to}${pathname.startsWith('/') ? '' : '/'}${pathname}`;
}

interface Props {
  fullWidth?: boolean;
  onChange?: () => void;
}

export default function LangSegmentToggle({ fullWidth = false, onChange }: Props) {
  const router = useRouter();
  const pathname = usePathname() || '/';
  const params = useParams<{ lang: string }>();
  const currentLang =
    params?.lang && supportedLocales.includes(params.lang as Locale) ? (params.lang as Locale) : defaultLocale;

  return (
    <div className={mergeClassNames('flex flex-wrap gap-2', fullWidth && 'w-full')} role="group" aria-label="언어 선택">
      {I18N_LOCALE_OPTIONS.map((option) => {
        const isActive = option.value === currentLang;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => {
              if (!supportedLocales.includes(option.value) || option.value === currentLang) {
                return;
              }

              router.push(replaceLangInPath(pathname, option.value as Locale));
              onChange?.();
            }}
            className={mergeClassNames(
              'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
              fullWidth && 'flex-1',
              isActive
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-background text-foreground hover:bg-accent'
            )}
            aria-pressed={isActive}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
