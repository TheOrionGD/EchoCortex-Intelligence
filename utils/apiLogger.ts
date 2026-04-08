/**
 * API Logger Utility
 * Wrapper for making API calls with automatic logging
 */

import { logger } from './logger';

export interface APICallOptions {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: Record<string, unknown>;
  headers?: Record<string, string>;
  timeout?: number;
}

export interface APIResponse<T> {
  status: number;
  data: T;
  duration: number;
}

/**
 * Make an API call with automatic logging
 */
export async function apiCall<T = unknown>(options: APICallOptions): Promise<APIResponse<T>> {
  const startTime = performance.now();
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  logger.logAPIRequestStarted(options.endpoint, options.method, requestId);

  try {
    const response = await fetch(options.endpoint, {
      method: options.method,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      signal: options.timeout ? AbortSignal.timeout(options.timeout) : undefined,
    });

    const duration = performance.now() - startTime;
    const data = (await response.json()) as T;

    if (!response.ok) {
      logger.logAPIRequestFailure(options.endpoint, options.method, response.status, new Error(`HTTP ${response.status}`), requestId);
      throw new Error(`API Error: ${response.status}`);
    }

    logger.logAPIRequestSuccess(options.endpoint, options.method, Math.round(duration), data, requestId);

    return {
      status: response.status,
      data,
      duration: Math.round(duration),
    };
  } catch (error) {
    const duration = performance.now() - startTime;
    const err = error instanceof Error ? error : new Error(String(error));

    logger.logAPIRequestFailure(options.endpoint, options.method, 0, err, requestId);

    throw err;
  }
}

/**
 * Helper for GET requests
 */
export async function apiGet<T = unknown>(endpoint: string, options?: Omit<APICallOptions, 'endpoint' | 'method'>): Promise<APIResponse<T>> {
  return apiCall<T>({
    ...options,
    endpoint,
    method: 'GET',
  });
}

/**
 * Helper for POST requests
 */
export async function apiPost<T = unknown>(
  endpoint: string,
  body?: Record<string, unknown>,
  options?: Omit<APICallOptions, 'endpoint' | 'method' | 'body'>
): Promise<APIResponse<T>> {
  return apiCall<T>({
    ...options,
    endpoint,
    method: 'POST',
    body,
  });
}

/**
 * Helper for PUT requests
 */
export async function apiPut<T = unknown>(
  endpoint: string,
  body?: Record<string, unknown>,
  options?: Omit<APICallOptions, 'endpoint' | 'method' | 'body'>
): Promise<APIResponse<T>> {
  return apiCall<T>({
    ...options,
    endpoint,
    method: 'PUT',
    body,
  });
}

/**
 * Helper for PATCH requests
 */
export async function apiPatch<T = unknown>(
  endpoint: string,
  body?: Record<string, unknown>,
  options?: Omit<APICallOptions, 'endpoint' | 'method' | 'body'>
): Promise<APIResponse<T>> {
  return apiCall<T>({
    ...options,
    endpoint,
    method: 'PATCH',
    body,
  });
}

/**
 * Helper for DELETE requests
 */
export async function apiDelete<T = unknown>(endpoint: string, options?: Omit<APICallOptions, 'endpoint' | 'method'>): Promise<APIResponse<T>> {
  return apiCall<T>({
    ...options,
    endpoint,
    method: 'DELETE',
  });
}
