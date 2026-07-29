import handlers from '@FsdShared/config/mock/handlers';
import { setupServer } from 'msw/node';

export const mockServerSetup = setupServer(...handlers);

if (typeof window === 'undefined' && process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  console.info('[MOCK] SSR mockServerSetup.listen()');
  mockServerSetup.listen({
    onUnhandledRequest: 'warn', // 또는 'warn'
  });
}

export default undefined;
