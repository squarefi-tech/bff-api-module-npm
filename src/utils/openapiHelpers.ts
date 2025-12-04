import type { paths } from '../api/types/autogen/apiV2.types';

/**
 * Тип для ответа openapi-fetch
 */
export type OpenApiResponse<T> =
  | { data: T; error?: never; response: Response }
  | { data?: never; error: Error; response: Response };

/**
 * Обрабатывает ответ от openapi-fetch и возвращает данные или выбрасывает ошибку
 * @param response - Ответ от openapi-fetch
 * @returns Данные из ответа
 * @throws Error если в ответе есть ошибка
 */
export function handleResponse<T>(response: OpenApiResponse<T>): T {
  if (response.error) {
    throw response.error;
  }
  if (!response.data) {
    throw new Error('No data in response');
  }
  return response.data;
}

/**
 * Создает типизированный запрос с обработкой ошибок
 * @param requestFn - Функция запроса от openapi-fetch клиента
 * @returns Promise с данными или ошибкой
 */
export async function createTypedRequest<T>(requestFn: () => Promise<OpenApiResponse<T>>): Promise<T> {
  const response = await requestFn();
  return handleResponse(response);
}

/**
 * Проверяет, является ли ответ успешным
 * @param response - Ответ от openapi-fetch
 * @returns true если ответ успешен, false если есть ошибка
 */
export function isSuccessResponse<T>(response: OpenApiResponse<T>): response is { data: T; response: Response } {
  return !response.error && response.data !== undefined;
}

/**
 * Проверяет, является ли ответ ошибкой
 * @param response - Ответ от openapi-fetch
 * @returns true если есть ошибка, false если ответ успешен
 */
export function isErrorResponse<T>(response: OpenApiResponse<T>): response is { error: Error; response: Response } {
  return !!response.error;
}

/**
 * Извлекает данные из ответа, возвращая undefined если есть ошибка
 * @param response - Ответ от openapi-fetch
 * @returns Данные или undefined
 */
export function getDataOrUndefined<T>(response: OpenApiResponse<T>): T | undefined {
  return response.data;
}

/**
 * Извлекает ошибку из ответа, возвращая undefined если ошибки нет
 * @param response - Ответ от openapi-fetch
 * @returns Ошибка или undefined
 */
export function getErrorOrUndefined<T>(response: OpenApiResponse<T>): Error | undefined {
  return response.error;
}
