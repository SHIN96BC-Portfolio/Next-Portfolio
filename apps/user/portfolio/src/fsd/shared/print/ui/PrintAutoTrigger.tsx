'use client';

import { useEffect } from 'react';

/** 인쇄 전용 페이지 로드 후 인쇄 대화상자를 연다 */
export default function PrintAutoTrigger() {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      window.print();
    }, 300);

    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
