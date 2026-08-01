import { graphql, HttpResponse } from 'msw';

const db = {
  users: [
    { id: '1', name: 'Alice', email: 'a@x.com' },
    { id: '2', name: 'Bob', email: 'b@x.com' },
  ],
};

const testMockHandler = [
  graphql.query('GetUsers', async () => {
    return HttpResponse.json({ data: { users: db.users } });
  }),

  // Query: GetUser
  graphql.query('GetUser', async ({ variables }) => {
    const u = db.users.find((x) => x.id === variables?.id);
    return HttpResponse.json({ data: { user: u ?? null } });
  }),

  // Mutation: CreateUser
  graphql.mutation('CreateUser', async ({ variables }) => {
    const nu = {
      id: String(Date.now()),
      name: variables?.name,
      email: variables?.email,
    };
    db.users.push(nu);
    return HttpResponse.json({ data: { createUser: nu } });
  }),

  // 필요 시: 모든 GraphQL 요청에 대한 안전망
  graphql.operation(async ({ operationName }) => {
    console.info('[MSW] Unhandled GQL op:', operationName);
    return HttpResponse.json({ data: null });
  }),
];

export default testMockHandler;
