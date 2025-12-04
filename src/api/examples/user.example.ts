/**
 * Примеры использования openapi-fetch клиента для user модуля
 * 
 * Демонстрирует использование GET, PATCH и POST запросов
 */

import { API } from '../types/types';
import { openApiClientV2 } from '../../utils/openapiClientFactory';
import { handleResponse, createTypedRequest } from '../../utils/openapiHelpers';

/**
 * Пример 1: Простой GET запрос
 * 
 * Старый способ (axios):
 * ```typescript
 * apiClientV2.getRequest<API.User.Get.Response>('/user')
 * ```
 */
export const getUser = async (): Promise<API.User.Get.Response> => {
  const { data, error } = await openApiClientV2.GET('/user');

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error('No data in response');
  }

  return data;
};

/**
 * Пример 2: GET запрос с helper функцией
 */
export const getUserData = async (): Promise<API.User.UserData.Get.Response> => {
  return handleResponse(await openApiClientV2.GET('/user/user-data'));
};

/**
 * Пример 3: PATCH запрос для обновления данных
 * 
 * Старый способ (axios):
 * ```typescript
 * apiClientV2.patchRequest<API.User.UserData.Update.Response>('/user/user-data', { data })
 * ```
 */
export const updateUserData = async (data: API.User.UserData.Update.Request): Promise<API.User.UserData.Update.Response> => {
  return handleResponse(
    await openApiClientV2.PATCH('/user/user-data', {
      body: data,
    }),
  );
};

/**
 * Пример 4: PATCH запрос с void возвращаемым типом
 */
export const requestPhoneUpdate = async (data: API.User.UpdateUser.Phone.RequestOTP.Request): Promise<void> => {
  const { error } = await openApiClientV2.PATCH('/user/phone', {
    body: data,
  });

  if (error) {
    throw error;
  }
};

/**
 * Пример 5: POST запрос для подтверждения
 */
export const confirmPhoneUpdate = async (data: API.User.UpdateUser.Phone.Confirm.Request): Promise<void> => {
  const response = await openApiClientV2.POST('/user/phone', {
    body: data,
  });

  if (response.error) {
    throw response.error;
  }
};

/**
 * Пример 6: Email update методы
 */
export const requestEmailUpdate = async (data: API.User.UpdateUser.Email.RequestOTP.Request): Promise<void> => {
  return createTypedRequest(async () =>
    openApiClientV2.PATCH('/user/email', {
      body: data,
    }),
  ).then(() => undefined); // Преобразуем в void
};

export const confirmEmailUpdate = async (data: API.User.UpdateUser.Email.Confirm.Request): Promise<void> => {
  const { error } = await openApiClientV2.POST('/user/email', {
    body: data,
  });

  if (error) {
    throw error;
  }
};

