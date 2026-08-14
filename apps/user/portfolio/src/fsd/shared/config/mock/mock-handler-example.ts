// eslint-disable-next-line import/no-extraneous-dependencies
import { HttpResponse, http } from 'msw';

// server handlers 예시
const mockHandlerExample = [
  http.get('/*', async ({ request }) => {
    return HttpResponse.json({ status: 200, ok: true });
  }),
  http.delete('/*', async ({ request }) => {
    return HttpResponse.json({ status: 200, ok: true });
  }),
  http.head('/*', async ({ request }) => {
    return HttpResponse.json({ status: 200, ok: true });
  }),
  http.options('/*', async ({ request }) => {
    return HttpResponse.json({ status: 200, ok: true });
  }),
  http.post('/*', async ({ request }) => {
    return HttpResponse.json({ status: 200, ok: true });
  }),
  http.put('/*', async ({ request }) => {
    return HttpResponse.json({ status: 200, ok: true });
  }),
  http.patch('/*', async ({ request }) => {
    return HttpResponse.json({ status: 200, ok: true });
  }),
];
