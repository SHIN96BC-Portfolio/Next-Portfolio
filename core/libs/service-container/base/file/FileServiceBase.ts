export interface FileInstance {
  fileUpload(url: string, data: FormData, config?: RequestInit): Promise<boolean>;
}

export interface FileServiceBase {
  file?: FileInstance;
  setToken?: (token: string) => void;
  getToken?: () => string | undefined;
  fileUpload: <R>(url: string, data: FormData, config?: RequestInit) => Promise<R>;
}
