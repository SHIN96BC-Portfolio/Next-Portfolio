'use client';

import setThemeCookie from '@FsdShared/config/theme/server-action/setThemeCookie';
import { startTransition, useEffect, useState } from 'react';

/** TODO: theme 변경 시 즉시 반영이 안되고 쿠키 세팅때문에 살짝 딜레이가 있어서 redux-persist + localStorage 같은거 써서 반영을 빠르게 해야할 듯 */
export default function ThemeToggle({ themeType = 'light' as 'light' | 'dark', path = '/' }) {
  const next = themeType === 'dark' ? 'light' : 'dark';
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleThemeChange = () => {
    // 사용성을 위해 즉시 theme 업데이트
    if (typeof document !== 'undefined') {
      const html = document.documentElement;

      if (next === 'dark') {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
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
        {themeType === 'dark' ? '🌙 Dark' : '☀️ Light'}
      </span>
    </button>
  );
}
