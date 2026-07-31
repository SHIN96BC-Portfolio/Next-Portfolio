import { defaultShouldDehydrateQuery, isServer, QueryClient } from '@tanstack/react-query';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
      dehydrate: {
        // dehydration 에 보류 중인 쿼리 포함
        shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
      },
    },
  });
}

/**
 * 공식문서에서 나온 것 처럼 queryClient 생성 규칙 설정
 * TanStack Query 는 하나의 인스턴스를 공유하는 것이 아니라 hydrate 와 dehydrate 를 통해서 동일한 캐시 스냅샷을 공유하는 것을 목적으로 한다.
 * 그래서 실제로 queryClient 는 최대 3개까지 관여하게 될 수 있다(프리로드용, 서버용, 클라이언트용)
 * 1. 서버용은 매 요청마다 새로운 인스턴스를 생성
 * 2. 클라이언트용은 싱글톤으로 생성(모듈 스코프 재사용)
 * 3. 프리로드용(요청 단위 임시 인스턴스)은 서버에서 prefetch 하는 단계에서만 잠깐 생성하여 사용
 */

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    // Server 일 때는 항상 새로운 query client 를 생성
    return makeQueryClient();
  } else {
    // Browser 일 때는 query client 가 아직 없는 경우에는 새로운 query client 를 생성하고 존재하면 기존 query client 사용
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }
    return browserQueryClient;
  }
}
