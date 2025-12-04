/* eslint-disable no-console */
import createClient from 'openapi-fetch';
import type { paths } from '../api/types/autogen/apiV2.types';

import { ResponseStatus } from '../constants';

import {
  API_V1_BASE_URL,
  API_V2_BASE_URL,
  API_TOTP_BASE_URL,
  TENANT_ID,
  LOGOUT_URL,
  REFRESH_TOKEN_PATH,
  TELEGRAM_SIGN_IN_PATH,
  TELEGRAM_SIGN_UP_PATH,
} from './apiConstants';

import { deleteTokens, getTokens, refreshTokens } from './tokensFactory';

type CreateOpenApiClientOptions = {
  baseURL: string;
  tenantId: string;
  isBearerToken?: boolean;
};

type RequestQueueItem = {
  resolve: () => void;
  reject: () => void;
  retry: () => Promise<void>;
};

// Глобальная очередь запросов для каждого клиента
const requestQueues = new Map<string, RequestQueueItem[]>();
const tokenRefreshing = new Map<string, boolean>();

const getQueueKey = (baseURL: string): string => baseURL;

export const createOpenApiClient = ({ baseURL, isBearerToken, tenantId }: CreateOpenApiClientOptions) => {
  const client = createClient<paths>({ baseUrl: baseURL });
  const queueKey = getQueueKey(baseURL);

  // Инициализация очереди для этого клиента
  if (!requestQueues.has(queueKey)) {
    requestQueues.set(queueKey, []);
  }
  if (!tokenRefreshing.has(queueKey)) {
    tokenRefreshing.set(queueKey, false);
  }

  // Middleware для добавления заголовков
  client.use({
    async onRequest({ request }) {
      const { access_token } = getTokens();

      // Добавляем обязательные заголовки
      request.headers.set('x-tenant-id', tenantId);

      if (access_token) {
        const authHeader = isBearerToken ? `Bearer ${access_token}` : access_token;
        request.headers.set('Authorization', authHeader);
      }

      // Добавляем app environment (по умолчанию web)
      request.headers.set('x-app-environment', 'web');

      return request;
    },

    async onResponse({ response, request }) {
      // Обработка 401 ошибок и refresh токенов
      if (response.status === ResponseStatus.UNAUTHORIZED) {
        const bypassHeader = request.headers.get('x-bypass-unauthorized');
        if (bypassHeader === 'true') {
          return response;
        }

        // На сервере просто возвращаем ошибку
        if (typeof window === 'undefined') {
          return response;
        }

        const url = new URL(request.url);
        const requestPath = url.pathname;
        const { refresh_token } = getTokens();
        const isRetryRequest = request.headers.get('x-retry-request') === 'true';

        const isRefreshTokenRequest = requestPath.includes(REFRESH_TOKEN_PATH);
        const isTelegramSignInRequest = requestPath.includes(TELEGRAM_SIGN_IN_PATH);
        const isTelegramSignUpRequest = requestPath.includes(TELEGRAM_SIGN_UP_PATH);
        const isRefreshNotRequired = !refresh_token;
        const isLogoutNecessary =
          isRefreshNotRequired ||
          isTelegramSignInRequest ||
          isTelegramSignUpRequest ||
          isRefreshTokenRequest ||
          isRetryRequest;

        const isRefreshAvailable = !tokenRefreshing.get(queueKey) && !isRefreshNotRequired;
        const queue = requestQueues.get(queueKey) || [];

        if (isLogoutNecessary) {
          if (typeof window !== 'undefined') {
            window.location.href = LOGOUT_URL;
            deleteTokens();
          }
          requestQueues.set(queueKey, []);
          return response;
        }

        if (isRefreshAvailable) {
          tokenRefreshing.set(queueKey, true);

          try {
            const data = await refreshTokens();
            if (data?.access_token) {
              // Разрешаем все запросы из очереди
              queue.forEach((item) => item.resolve());
              requestQueues.set(queueKey, []);
            }
          } catch (tokenRefreshError) {
            if (typeof window !== 'undefined') {
              window.location.href = LOGOUT_URL;
              deleteTokens();
            }
            requestQueues.set(queueKey, []);
            // Отклоняем все запросы из очереди
            queue.forEach((item) => item.reject());
            throw tokenRefreshError;
          } finally {
            tokenRefreshing.set(queueKey, false);
          }

          // Повторяем запрос с новым токеном
          const { access_token } = getTokens();
          if (access_token) {
            const authHeader = isBearerToken ? `Bearer ${access_token}` : access_token;
            request.headers.set('Authorization', authHeader);
            request.headers.set('x-retry-request', 'true');

            // Повторяем запрос
            const retryResponse = await fetch(request);
            return retryResponse;
          }
        } else if (tokenRefreshing.get(queueKey)) {
          // Добавляем в очередь
          return new Promise<Response>((resolve, reject) => {
            const retry = async (): Promise<Response> => {
              const { access_token } = getTokens();
              if (access_token) {
                const authHeader = isBearerToken ? `Bearer ${access_token}` : access_token;
                request.headers.set('Authorization', authHeader);
                request.headers.set('x-retry-request', 'true');

                const retryResponse = await fetch(request);
                return retryResponse;
              } else {
                throw new Error('No access token after refresh');
              }
            };

            queue.push({
              resolve: () => {
                retry()
                  .then((response) => resolve(response))
                  .catch((error) => reject(error));
              },
              reject: () => reject(new Error('Request cancelled')),
              retry: async () => {
                await retry();
              },
            });
            requestQueues.set(queueKey, queue);
          });
        }
      }

      return response;
    },
  });

  return client;
};

// Экспорт готовых клиентов
export const openApiClientV1 = createOpenApiClient({
  baseURL: API_V1_BASE_URL,
  tenantId: TENANT_ID,
});

export const openApiClientV2 = createOpenApiClient({
  baseURL: API_V2_BASE_URL,
  tenantId: TENANT_ID,
  isBearerToken: true,
});

export const openApiClientTOTP = createOpenApiClient({
  baseURL: API_TOTP_BASE_URL,
  tenantId: TENANT_ID,
  isBearerToken: true,
});
