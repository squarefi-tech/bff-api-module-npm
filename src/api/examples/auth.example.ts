/**
 * Примеры использования openapi-fetch клиента для auth модуля
 *
 * Этот файл демонстрирует, как использовать новый openapi-fetch клиент
 * вместо старого axios-клиента для методов аутентификации.
 */

import { API } from '../types/types';
import { openApiClientV2 } from '../../utils/openapiClientFactory';
import { handleResponse, createTypedRequest } from '../../utils/openapiHelpers';
import { convertPhoneToSupabaseFormat } from '../../utils/converters';

/**
 * Пример 1: Простой POST запрос с обработкой ошибок
 *
 * Старый способ (axios):
 * ```typescript
 * apiClientV2.postRequest<API.Auth.VerifyOtp.Response>('/auth/verify/email/otp', {
 *   data: { email, token, type: 'email' },
 *   context: { bypassUnauthorizedHandler: true },
 * })
 * ```
 */
export const verifyEmailOtp = async (email: string, token: string): Promise<API.Auth.VerifyOtp.Response> => {
  const { data, error } = await openApiClientV2.POST('/auth/verify/email/otp', {
    body: { email, token, type: 'email' },
    headers: { 'x-bypass-unauthorized': 'true' },
  });

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error('No data in response');
  }

  return data;
};

/**
 * Пример 2: Использование helper функции handleResponse
 */
export const verifyPhoneOtp = async (phone: string, token: string): Promise<API.Auth.VerifyOtp.Response> => {
  const response = await openApiClientV2.POST('/auth/verify/phone/otp', {
    body: {
      phone: convertPhoneToSupabaseFormat(phone),
      token,
      type: 'sms',
    },
    headers: { 'x-bypass-unauthorized': 'true' },
  });

  return handleResponse(response);
};

/**
 * Пример 3: Использование createTypedRequest для более чистого кода
 */
export const signInOmniEmail = async (data: API.Auth.SignIn.Omni.Email.OTP.Request): Promise<API.Auth.Tokens> => {
  return createTypedRequest(async () =>
    openApiClientV2.POST('/auth/sign-in/omni/email/otp', {
      body: data,
      headers: { 'x-bypass-unauthorized': 'true' },
    }),
  );
};

/**
 * Пример 4: Запрос с деструктуризацией параметров
 */
export const signInOmniPhone = async ({
  phone,
  ...data
}: API.Auth.SignIn.Omni.Phone.OTP.Request): Promise<API.Auth.Tokens> => {
  const response = await openApiClientV2.POST('/auth/sign-in/omni/phone/otp', {
    body: { phone: convertPhoneToSupabaseFormat(phone), ...data },
    headers: { 'x-bypass-unauthorized': 'true' },
  });

  return handleResponse(response);
};

/**
 * Пример 5: Простой POST без дополнительных параметров
 */
export const signInByType = async (data: API.Auth.SignIn.ByType.Request): Promise<API.Auth.Tokens> => {
  const { data: responseData, error } = await openApiClientV2.POST('/auth/sign-in', {
    body: data,
    headers: { 'x-bypass-unauthorized': 'true' },
  });

  if (error) throw error;
  if (!responseData) throw new Error('No data in response');

  return responseData;
};

/**
 * Пример 6: Telegram signin (без bypass, так как требует авторизации)
 */
export const signInTelegram = async (
  data: API.Auth.Telegram.Signin.Request,
): Promise<API.Auth.Telegram.Signin.Response> => {
  return handleResponse(
    await openApiClientV2.POST('/auth/sign-in/telegram', {
      body: data,
    }),
  );
};

/**
 * Пример 7: Password signin
 */
export const signInPassword = async (email: string, password: string): Promise<API.Auth.Tokens> => {
  return createTypedRequest(async () =>
    openApiClientV2.POST('/auth/sign-in/password/email', {
      body: { email, password },
      headers: { 'x-bypass-unauthorized': 'true' },
    }),
  );
};

/**
 * Пример 8: Signup методы
 */
export const signUpByType = async (data: API.Auth.SignUp.ByType.Request): Promise<API.Auth.Tokens> => {
  return handleResponse(
    await openApiClientV2.POST('/auth/sign-up', {
      body: data,
      headers: { 'x-bypass-unauthorized': 'true' },
    }),
  );
};

export const signUpPassword = async (email: string, password: string): Promise<API.Auth.Tokens> => {
  return handleResponse(
    await openApiClientV2.POST('/auth/sign-up/password/email', {
      body: { email, password },
      headers: { 'x-bypass-unauthorized': 'true' },
    }),
  );
};

export const signUpTelegram = async (
  data: API.Auth.Telegram.Signup.Request,
): Promise<API.Auth.Telegram.Signup.Response> => {
  return handleResponse(
    await openApiClientV2.POST('/auth/sign-up/telegram', {
      body: data,
    }),
  );
};

/**
 * Пример 9: Refresh token
 */
export const refreshToken = async (data: API.Auth.RefreshToken.Request): Promise<API.Auth.RefreshToken.Response> => {
  return handleResponse(
    await openApiClientV2.POST('/auth/refresh/refresh-token', {
      body: data,
    }),
  );
};
