/* eslint-disable */
import type { DocumentNode } from 'graphql';
import { print } from 'graphql';
import { getGraphqlClient } from './graphql-client';

type FetchParams<TVars> = string | { document: string | DocumentNode; variables?: TVars; operationName?: string };

// 두 오버로드를 모두 표현 (교차 타입으로)
type Sender<TData, TVars> = {
  $send: ((vars?: TVars) => Promise<TData>) & ((op: string, vars?: TVars) => Promise<TData>);
};

// 런타임 가드로 string(에러 메시지) / 잘못된 객체 차단 + 타입 좁히기
function toSender<TData, TVars>(x: unknown): Sender<TData, TVars> {
  if (typeof x === 'string') throw new Error(x);
  if (!x || typeof (x as { $send?: unknown }).$send !== 'function') {
    throw new Error('Graffle sender is not initialized (transport not configured?)');
  }
  // TS가 제네릭 구조를 충분히 추론 못하므로 unknown → Sender 로 “의도적” 단언
  return x as unknown as Sender<TData, TVars>;
}

export async function graphqlFetcher<TData, TVariables = Record<string, unknown>>(
  queryOrParams: FetchParams<TVariables>,
  maybeVars?: TVariables
): Promise<TData> {
  const isStr = typeof queryOrParams === 'string';
  const rawDoc = isStr ? queryOrParams : queryOrParams.document;
  const query = typeof rawDoc === 'string' ? rawDoc : print(rawDoc);

  // selection-set만 온 경우 보정
  const normalized = query.trim().startsWith('{') ? `query ${query}` : query;

  const variables = (isStr ? maybeVars : queryOrParams.variables) as TVariables | undefined;
  const opName = isStr ? undefined : queryOrParams.operationName;

  const client = await getGraphqlClient();
  const senderUnknown = client.gql(normalized); // 여기서 때때로 string(에러) 반환 가능
  const sender = toSender<TData, TVariables>(senderUnknown); // ✅ 타입 가드로 안전하게 좁힘

  // 두 오버로드 모두 커버됨 (교차 타입)
  return opName ? sender.$send(opName, variables) : sender.$send(variables);
}
