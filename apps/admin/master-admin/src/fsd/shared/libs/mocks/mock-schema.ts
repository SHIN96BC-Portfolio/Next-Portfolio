// mocks/schema.ts

import { mergeTypeDefs } from '@graphql-tools/merge';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';

const typeDefs = mergeTypeDefs([], { throwOnConflict: true });

const base = makeExecutableSchema({ typeDefs });

export const mockSchema = addMocksToSchema({
  schema: base,
  mocks: {
    Int: () => (Math.floor(Math.random() * 1_000_000) % 500000) + 5000,
    Float: () => Number((Math.random() * 5).toFixed(1)),
    Boolean: () => Math.random() > 0.2,
    DateTime: () => new Date(Date.now() - Math.random() * 3.15e10).toISOString(),
    Product: () => ({
      images: () => Array.from({ length: 3 }, (_, i) => `https://picsum.photos/seed/p${i}/800/800`),
      thumbnailUrl: () => `https://picsum.photos/seed/thumb/400/400`,
      currency: () => 'KRW',
      category: () => ({ id: '1', name: 'Electronics' }),
    }),
    PageInfo: () => ({ total: 120, page: 1, pageSize: 20, pages: 6 }),
    ProductsPayload: () => ({ ok: true }),
    ProductPayload: () => ({ ok: true }),
  },
  preserveResolvers: false,
});

export const schema = mockSchema;
