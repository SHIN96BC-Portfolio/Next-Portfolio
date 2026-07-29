import HttpError from '@Libs/service-container/error/HttpError';
import convertToQueryString, { QueryParamObject } from '@Libs/utils/convert-to-query-string';
import { CommonServiceBase, HTTPInstance } from './CommonServiceBase';

/**
 * API Request Service Base
 */
class CommonServiceBaseImpl implements CommonServiceBase {
  /**
   * HTTP Request Method Instance
   * @type {HTTPInstance}
   */
  public http: HTTPInstance;

  /**
   * API Request Base URL
   * @type {string}
   * @private
   */
  private baseURL: string;

  /**
   * HTTP Request HomeHeader
   * @type {Record<string, string>}
   * @private
   */
  private headers: Record<string, string>;

  /**
   * Authorization Token
   * @type {string}
   */
  private token?: string;

  constructor() {
    this.baseURL = `${process.env.NEXT_PUBLIC_API_SERVER_URL}`;
    this.headers = {
      // csrf: 'token',
      // Referer: this.baseURL,
    };

    /**
     * HTTP Instance Constructor Injection
     * @type {{head: <R>(url: string, config?: RequestInit) => Promise<R>, patch: <R, A=NonNullable<unknown>>(url: string, data?: A, config?: RequestInit) => Promise<R>, post: <R, A=NonNullable<unknown>>(url: string, data?: A, config?: RequestInit) => Promise<R>, get: <R, A=NonNullable<unknown>>(url: string, params?: A, config?: RequestInit) => Promise<R>, options: <R>(url: string, config?: RequestInit) => Promise<R>, delete: <R>(url: string, config?: RequestInit) => Promise<R>, put: <R, A=NonNullable<unknown>>(url: string, data?: A, config?: RequestInit) => Promise<R>}}
     */
    this.http = {
      get: this.get.bind(this),
      delete: this.delete.bind(this),
      head: this.head.bind(this),
      options: this.options.bind(this),
      post: this.post.bind(this),
      put: this.put.bind(this),
      patch: this.patch.bind(this),
    };
  }

  /**
   * Authorization Token Set Method
   * @param {string} token
   */
  public setToken(token: string): void {
    this.token = token;
  }

  /**
   * Authorization Token Get Method
   * @returns {string | undefined}
   */
  public getToken(): string | undefined {
    return this.token;
  }

  /**
   * 응답 본문을 안전하게 파싱
   * - JSON 이면 json()
   * - 그 외면 text()
   * - 204/304/Content-Length:0 등 본문 없음도 대비
   */
  private async safeParseBody(response: Response): Promise<unknown | undefined> {
    const contentLength = response.headers.get('content-length');
    const contentType = response.headers.get('content-type') || '';

    // 본문이 없을 수 있는 상태들
    if (
      response.status === 204 || // No Content
      response.status === 304 || // Not Modified
      contentLength === '0'
    ) {
      return undefined;
    }

    // 스트림을 이미 소비했는지 방어
    if ((response as any).bodyUsed) return undefined;

    // JSON 우선
    if (contentType.includes('application/json')) {
      try {
        return await response.json();
      } catch {
        // JSON이라고 왔는데 파싱 실패 → 텍스트로 한번 더 시도
        try {
          return await response.text();
        } catch {
          return undefined;
        }
      }
    }

    // 그 외 컨텐츠는 텍스트로
    try {
      return await response.text();
    } catch {
      return undefined;
    }
  }

  /**
   * Common Request Method
   * @param {string} method
   * @param {string} url
   * @param params
   * @param data
   * @param {RequestInit} config
   * @returns {Promise<R>}
   * @private
   */
  private async request<R = unknown>({
    method,
    url,
    params,
    data,
    config,
  }: {
    method: string;
    url: string;
    params?: unknown;
    data?: unknown;
    config?: RequestInit;
  }): Promise<R> {
    try {
      const headers: HeadersInit & { Authorization?: string } = {
        ...this.headers,
        'Content-Type': 'application/json',
        ...config?.headers,
      };

      if (this.token) {
        headers.Authorization = `Bearer ${this.token}`;
      }

      const reqUrl =
        (method === 'GET' || method === 'DELETE') && typeof params === 'object'
          ? `${url}?${convertToQueryString(params as QueryParamObject)}`
          : url;

      const response = await fetch(this.baseURL + reqUrl, {
        method,
        headers,
        // credentials: 'include',
        body: data ? JSON.stringify(data) : undefined,
        ...config,
      });

      if (!response.ok) {
        const body = await this.safeParseBody(response);

        throw new HttpError({
          message: `[${response.status}] ${response.statusText} - ${reqUrl}`,
          status: response.status,
          statusText: response.statusText,
          url: this.baseURL + reqUrl,
          headers: response.headers,
          body,
        });
      }

      // OK인 경우에도 JSON이 아닐 수 있으므로 안전 파싱
      const parsed = await this.safeParseBody(response);

      return parsed as R;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  /**
   * HTTP GET Method
   * @param {string} url
   * @param {A} params
   * @param {RequestInit} config
   * @returns {Promise<R>}
   */
  private get<R, A = NonNullable<unknown>>(url: string, params?: A, config?: RequestInit): Promise<R> {
    return this.request<R>({ method: 'GET', url, params, config });
  }

  /**
   * HTTP DELETE Method
   * @param {string} url
   * @param {A} params
   * @param {RequestInit} config
   * @returns {Promise<R>}
   */
  private delete<R, A = NonNullable<unknown>>(url: string, params?: A, config?: RequestInit): Promise<R> {
    return this.request<R>({ method: 'DELETE', url, params, config });
  }

  /**
   * HTTP HEAD Method
   * @param {string} url
   * @param {RequestInit} config
   * @returns {Promise<R>}
   */
  private head<R>(url: string, config?: RequestInit): Promise<R> {
    return this.request<R>({ method: 'HEAD', url, config });
  }

  /**
   * HTTP OPTIONS Method
   * @param {string} url
   * @param {RequestInit} config
   * @returns {Promise<R>}
   */
  private options<R>(url: string, config?: RequestInit): Promise<R> {
    return this.request<R>({ method: 'OPTIONS', url, config });
  }

  /**
   * HTTP POST Method
   * @param {string} url
   * @param {A} data
   * @param {RequestInit} config
   * @returns {Promise<R>}
   */
  private post<R, A = NonNullable<unknown>>(url: string, data?: A, config?: RequestInit): Promise<R> {
    return this.request<R>({ method: 'POST', url, data, config });
  }

  /**
   * HTTP PUT Method
   * @param {string} url
   * @param {A} data
   * @param {RequestInit} config
   * @returns {Promise<R>}
   */
  private put<R, A = NonNullable<unknown>>(url: string, data?: A, config?: RequestInit): Promise<R> {
    return this.request<R>({ method: 'PUT', url, data, config });
  }

  /**
   * HTTP PATCH Method
   * @param {string} url
   * @param {A} data
   * @param {RequestInit} config
   * @returns {Promise<R>}
   */
  private patch<R, A = NonNullable<unknown>>(url: string, data?: A, config?: RequestInit): Promise<R> {
    return this.request<R>({ method: 'PATCH', url, data, config });
  }
}

export default CommonServiceBaseImpl;
