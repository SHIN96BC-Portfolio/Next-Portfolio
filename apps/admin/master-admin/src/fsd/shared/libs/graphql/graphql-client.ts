// src/shared/api/graffle-client.ts
import { Graffle } from 'graffle';
import { TransportHttp } from 'graffle/extensions/transport-http';
import { TransportMemory } from 'graffle/extensions/transport-memory';
import type { GraphQLSchema } from 'graphql';

let _clientPromise: Promise<ReturnType<typeof Graffle.create>> | null = null;

async function loadDevSchema(): Promise<GraphQLSchema> {
  const { schema } = await import('@FsdShared/libs/mocks/mock-schema');
  return schema;
}

export async function getGraphqlClient() {
  if (_clientPromise) {
    return _clientPromise;
  }
  _clientPromise = (async () => {
    const client = Graffle.create();

    if (process.env.NEXT_PUBLIC_RUNTIME_MODE === 'dev') {
      const schema = await loadDevSchema();
      client.use(TransportMemory).transport('memory', { schema }); // ✅ 메모리 활성화
    } else {
      const url = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
      if (!url) {
        throw new Error('NEXT_PUBLIC_GRAPHQL_ENDPOINT is missing');
      }
      client.use(TransportHttp).transport('http', {
        // ✅ HTTP 활성화
        url,
        headers: { 'content-type': 'application/json' },
      });
    }
    return client;
  })();
  return _clientPromise;
}

export async function setGraphqlToken(token?: string) {
  const g = await getGraphqlClient();
  // 현재 선택된 트랜스포트의 헤더 갱신
  g.transport({ headers: { authorization: token ? `Bearer ${token}` : '' } });
}

export async function clearGraphqlToken() {
  await setGraphqlToken();
}
