import { HttpResponse, http } from 'msw';

const fileMockHandler = [
  http.post('http://localhost:8080/file/upload', async () => {
    return HttpResponse.json({
      status: 200,
      ok: true,
      result: { isOk: true },
    });
  }),

  http.post('http://localhost:8080/file/upload/error', async () => {
    return new HttpResponse('server error', { status: 500 });
  }),

  http.post('http://localhost:8080/file/upload/network_error', async () => {
    return HttpResponse.error();
  }),
];

export default fileMockHandler;
