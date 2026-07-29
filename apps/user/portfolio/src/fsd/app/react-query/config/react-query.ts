import { getQueryClient } from '@FsdShared/config/react-query/react-query.setup';
import { isEqual } from '@Libs/utils';
import { dehydrate, QueryKey, QueryState } from '@tanstack/react-query';

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

interface QueryProps<ResponseType = unknown> {
  queryKey: QueryKey;
  queryFn: () => Promise<ResponseType>;
}

interface DehydratedQueryExtended<TData = unknown, TError = unknown> {
  state: QueryState<TData, TError>;
}

/* getDehydratedQuery는 서버에서 데이터를 prefetching하고 dehydrate한 결과를 return 하도록 구성(SSR) */
export async function getDehydratedQuery<Q extends QueryProps>({ queryKey, queryFn }: Q) {
  const queryClient = getQueryClient();

  try {
    const existingData = queryClient.getQueryData(queryKey);

    if (!existingData) {
      await queryClient.prefetchQuery({ queryKey, queryFn });
    }
  } catch (error) {
    console.error('Error in prefetchQuery:', error);
    return null; // 에러가 발생하면 null 반환
  }

  const { queries } = dehydrate(queryClient);
  const [dehydratedQuery] = queries.filter((query) => isEqual(query.queryKey, queryKey));

  return dehydratedQuery as DehydratedQueryExtended<UnwrapPromise<ReturnType<Q['queryFn']>>>;
}

// filtering 하지 않고 모든 dehydrated query를 반환하는 함수
export async function getDehydratedQueries<Q extends QueryProps[]>(queries: Q) {
  const queryClient = getQueryClient();

  await Promise.all(queries.map(({ queryKey, queryFn }) => queryClient.prefetchQuery({ queryKey, queryFn })));

  return dehydrate(queryClient).queries as DehydratedQueryExtended<UnwrapPromise<ReturnType<Q[number]['queryFn']>>>[];
}

export { HydrationBoundary } from '@tanstack/react-query';

export default undefined;
