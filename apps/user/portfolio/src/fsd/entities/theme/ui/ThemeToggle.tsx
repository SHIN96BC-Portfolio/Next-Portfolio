'use client';

import {
  getOppositeThemeType,
  isDarkTheme,
  resolveThemeType,
  THEME_DOM_CLASS,
  THEME_TYPE,
  ThemeType,
} from '@FsdShared/config/theme/model/type';
import setThemeCookie from '@FsdShared/config/theme/server-action/setThemeCookie';
import { startTransition, useEffect, useState } from 'react';

interface Props {
  themeType?: ThemeType;
  path?: string;
}

/**
 * 라이트/다크 테마 토글 (Client Component).
 *
 * - 클릭 시 DOM에 즉시 반영한 뒤 `setThemeCookie` server action으로 쿠키를 저장합니다.
 * - `themeType`은 서버 layout에서 읽은 현재 테마입니다.
 */
export default function ThemeToggle({ themeType = THEME_TYPE.LIGHT, path = '/' }: Props) {
  const resolvedTheme = resolveThemeType(themeType);
  const next = getOppositeThemeType(resolvedTheme);
  const [isLoading, setIsLoading] = useState(false);

  const handleThemeChange = () => {
    // 사용성을 위해 즉시 theme 업데이트
    if (typeof document !== 'undefined') {
      const html = document.documentElement;

      if (isDarkTheme(next)) {
        html.classList.add(THEME_DOM_CLASS.DARK);
      } else {
        html.classList.remove(THEME_DOM_CLASS.DARK);
      }

      html.style.setProperty('color-scheme', next);
    }

    // 서버 쿠키 적용까지 로딩 적용
    setIsLoading(true);

    // 서버 쿠키 업데이트
    startTransition(() => setThemeCookie(next, path));
  };

  useEffect(() => {
    // 서버 쿠키 업데이트 적용 완료 후 로딩 해제
    setIsLoading(false);
  }, [themeType]);

  return (
    <button
      onClick={handleThemeChange}
      disabled={isLoading}
      aria-busy={isLoading}
      className={`
        relative flex items-center justify-center gap-2
        px-3 py-2 rounded border
        bg-background text-foreground
        transition-colors duration-150
        cursor-pointer
        ${isLoading ? 'cursor-not-allowed opacity-80' : 'hover:bg-muted'}
      `}
    >
      {/* 로딩 시 오버레이 */}
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center bg-background/60">
          <svg
            className="h-4 w-4 animate-spin text-primary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        </span>
      )}

      <span className={`transition-opacity ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {isDarkTheme(resolvedTheme) ? '☀️ Light' : '🌙 Dark'}
      </span>
    </button>
  );
}
