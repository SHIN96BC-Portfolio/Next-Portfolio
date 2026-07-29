import { FileInstance, FileServiceBase } from './FileServiceBase';

/**
 * API File Request Base
 */
class FileServiceBaseImpl implements FileServiceBase {
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
   * File Request Method Instance
   * @type {FileInstance}
   */
  public file: FileInstance;

  /**
   * Authorization Token
   * @type {string}
   */
  private token?: string;

  /**
   * File Service Base Instance
   * @type {FileServiceBase}
   * @private
   */
  // private static instance: FileServiceBase;

  constructor() {
    this.baseURL = `${process.env.NEXT_PUBLIC_API_FILE_SERVER_URL}`;
    this.headers = {
      // csrf: 'token',
      // Referer: this.baseURL,
    };

    /**
     * File Instance Constructor Injection
     * @type {{fileUpload: (url: string, data: FormData, config?: RequestInit) => Promise<boolean>}}
     */
    this.file = {
      fileUpload: this.fileUpload.bind(this),
    };
  }

  /**
   * 싱글톤 패턴 사용
   * @returns {FileServiceBase}
   */
  // public static getInstance(): FileServiceBase {
  //   if (!this.instance) {
  //     this.instance = new FileServiceBaseImpl();
  //   }
  //
  //   return this.instance;
  // }

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
   * Common File Request Method
   * @param {string} method
   * @param {string} url
   * @param {FormData} data
   * @param {RequestInit} config
   * @returns {Promise<boolean>}
   * @private
   */
  private async fileRequest<R>(method: string, url: string, data: FormData, config?: RequestInit): Promise<R> {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          ...this.headers,
          // 'Content-Type': 'multipart/form-data',
          ...config?.headers,
        },
        // credentials: 'include',
        body: data,
        ...config,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return await response.json();
      // return true;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  /**
   * File Upload Method
   * @param {string} url
   * @param {FormData} data
   * @param {RequestInit} config
   * @returns {Promise<R>}
   */
  public fileUpload<R>(url: string, data: FormData, config?: RequestInit): Promise<R> {
    return this.fileRequest<R>('POST', url, data, config);
  }
}

export default FileServiceBaseImpl;
