'use client';

import { useLinkStatus } from 'next/link';

/**
 * Link 태그의 탐색이 완료 될 때까지 대기중 상태 표시 컴포넌트
 * - Link 태크 안에서만 사용
 * - prefetch 가 비활성화 된 상태에서 유용
 */
export default function LinkHint() {
  const { pending } = useLinkStatus();

  return <span aria-hidden className={`link-hint ${pending ? 'is-pending' : ''}`} />;
}
