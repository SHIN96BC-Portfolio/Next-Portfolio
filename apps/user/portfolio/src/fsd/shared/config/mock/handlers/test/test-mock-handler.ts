import { addDelay } from '@FsdShared/config/mock/handlers';
import { host } from '@FsdShared/config/mock/mock.config';
import { HttpResponse, http } from 'msw';

const testMockHandler = [
  http.get(`${host}/test`, async ({ request }) => {
    console.info('msw get /test');
    return addDelay(
      HttpResponse.json({
        status: 200,
        ok: true,
        result: {
          name: 'test',
          email: 'test@test.com',
          phone: '000-0000-0000',
        },
      }),
      1500
    );
  }),
  http.delete(`${host}/test`, async ({ request }) => {
    return addDelay(
      HttpResponse.json({
        status: 200,
        ok: true,
        result: { isOk: true },
      }),
      1500
    );
  }),
  http.head(`${host}/test`, async ({ request }) => {
    return HttpResponse.json({
      status: 200,
      ok: true,
    });
  }),

  http.options(`${host}/test`, async ({ request }) => {
    return HttpResponse.json({
      status: 200,
      ok: true,
    });
  }),
  http.post(`${host}/test`, async ({ request }) => {
    return addDelay(
      HttpResponse.json({
        status: 200,
        ok: true,
        result: { isOk: true },
      }),
      2000
    );
  }),
  http.put(`${host}/test`, async ({ request }) => {
    return addDelay(
      HttpResponse.json({
        status: 200,
        ok: true,
        result: { isOk: true },
      }),
      1500
    );
  }),
  http.patch(`${host}/test`, async ({ request }) => {
    return addDelay(
      HttpResponse.json({
        status: 200,
        ok: true,
        result: { isOk: true },
      }),
      1500
    );
  }),

  http.get(`${host}/test/error`, async ({ request }) => {
    return new HttpResponse('server error', { status: 500 });
  }),
  http.post(`${host}/test/error`, async ({ request }) => {
    return new HttpResponse('server error', { status: 500 });
  }),
  http.get(`${host}/test/network_error`, async ({ request }) => {
    return HttpResponse.error();
  }),
  http.post(`${host}/test/network_error`, async ({ request }) => {
    return HttpResponse.error();
  }),
];

export default testMockHandler;
