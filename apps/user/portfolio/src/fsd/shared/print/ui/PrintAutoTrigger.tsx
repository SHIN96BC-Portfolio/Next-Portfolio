'use client';

import { useEffect } from 'react';

/**
 * 인쇄 전용 라우트(`/print`, `/resume/print`)용 자동 인쇄 트리거.
 * 페이지 전체가 print CSS 대상이므로 `@core/bc-ui` DirectPrint(영역 clone)이 아니라 `window.print()`를 사용한다.
 */
export default function PrintAutoTrigger() {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      window.print();
    }, 300);

    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
