/**
 * Contrato de Cliente HTTP/API (DIP / LSP).
 */
export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  timeoutMs?: number;
}

export interface IApiClient {
  get<T>(endpoint: string, options?: RequestOptions): Promise<T>;
  post<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T>;
  put<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T>;
  delete<T>(endpoint: string, options?: RequestOptions): Promise<T>;
}
