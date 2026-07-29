export default class HttpError extends Error {
  status: number;
  statusText: string;
  url: string;
  headers: Headers;
  body?: unknown;

  constructor(params: {
    message: string;
    status: number;
    statusText: string;
    url: string;
    headers: Headers;
    body?: unknown;
  }) {
    super(params.message);
    this.name = 'HttpError';
    this.status = params.status;
    this.statusText = params.statusText;
    this.url = params.url;
    this.headers = params.headers;
    this.body = params.body;
  }
}
