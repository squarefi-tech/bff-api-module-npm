/* eslint-disable no-console */
import { isTMA } from '@telegram-apps/sdk-react';
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

import { telegramSignUpPath, telegramSignInPath, refreshTokenPath } from '../api/auth';

import { AppEnviroment, ResponseStatus } from '../constants';
import { getFromLocalStorage } from '../utils/storage';
import { deleteTokens, refreshTokens } from '../utils/tokensFactory';

// eslint-disable-next-line no-constant-condition

const apiV1BaseURL = process.env.API_URL ?? 'ENV variable API_URL is not defined';
const apiV2BaseURL = process.env.API_V2_URL ?? 'ENV variable API_V2_URL is not defined';
const envTenantId = process.env.TENANT_ID ?? 'ENV variable TENANT_ID is not defined';

type CreateApiClientOptions = {
  baseURL: string;
  tenantId: string;
  isBearerToken?: boolean;
};

export const createApiClient = ({ baseURL, isBearerToken, tenantId }: CreateApiClientOptions) => {
  type RequestQueueItem = {
    resolve: Function;
    reject: Function;
  };

  const instance = axios.create({
    baseURL,
    timeout: 60000,
  });

  instance.interceptors.request.use((config) => {
    const access_token = getFromLocalStorage('access_token');

    const modifiedHeaders = {
      ...config.headers,
      'App-Enviroment': isTMA() ? AppEnviroment.TELEGRAM : AppEnviroment.WEB,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-tenant-id': tenantId,
    };

    if (access_token) {
      const authHeader = isBearerToken ? `Bearer ${access_token}` : access_token;
      modifiedHeaders.Authorization = authHeader;
    }

    return { ...config, headers: modifiedHeaders } as unknown as InternalAxiosRequestConfig;
  });

  let isTokenRefreshing = false;
  let requestQueue: RequestQueueItem[] = [];

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (typeof window === 'undefined') {
        return Promise.reject(error);
      }
      if (error?.response?.status === ResponseStatus.UNAUTHORIZED) {
        const { response, config: failedRequest } = error;
        const refreshToken = getFromLocalStorage('refresh_token');
        const isRetryRequest = failedRequest.headers['X-Retry-Request'];

        const isRefreshTokenRequest = response?.config?.url.includes(refreshTokenPath);
        const isTelegramSignInRequest = response?.config?.url.includes(telegramSignInPath);
        const isTelegramSignUpRequest = response?.config?.url.includes(telegramSignUpPath);
        const isRefreshNotRequired = !refreshToken && !isTMA();
        const isLogoutNeccesary =
          isRefreshNotRequired ||
          isTelegramSignInRequest ||
          isTelegramSignUpRequest ||
          isRefreshTokenRequest ||
          isRetryRequest;

        const isRefreshAvailable = (!isTokenRefreshing && typeof refreshToken === 'string') || isTMA();

        if (isLogoutNeccesary) {
          if (typeof window !== 'undefined') {
            window.location.href = '/logout';
            deleteTokens();
          }
          requestQueue = [];
          return Promise.reject(response);
        }
        if (isRefreshAvailable) {
          refreshTokens()
            .then((data) => {
              if (data?.access_token) {
                requestQueue.forEach((request) => request.resolve());
                requestQueue = [];
              }
            })
            .catch((tokenRefreshError) => {
              if (typeof window !== 'undefined') {
                window.location.href = '/logout';
                deleteTokens();
              }
              requestQueue = [];
              return Promise.reject(tokenRefreshError);
            })
            .finally(() => {
              isTokenRefreshing = false;
            });
        }
        return new Promise((res, rej) => {
          requestQueue.push({
            resolve: () => {
              failedRequest.headers['X-Retry-Request'] = 'true';
              return res(instance(failedRequest));
            },
            reject: () => rej(instance(failedRequest)),
          });
        });
      }

      console.error('Axios error', error);

      return Promise.reject(error);
    }
  );

  const patchRequest = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const { data = {}, ...restConfig } = config ?? {};

    const res = await instance.patch(url, data, restConfig);

    return res.data;
  };

  const postRequest = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const { data = {}, ...restConfig } = config ?? {};

    const res = await instance.post(url, data, restConfig);

    return res.data;
  };

  const deleteRequest = async (url: string, config?: AxiosRequestConfig) => {
    const { data = {}, ...restConfig } = config ?? {};

    const res = await instance.delete(url, { data, ...restConfig });

    return res.data;
  };

  const getRequest = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const { params = {}, ...restConfig } = config ?? {};

    const res = await instance.get(url, { params, ...restConfig });

    return res.data;
  };

  return { patchRequest, postRequest, deleteRequest, getRequest };
};

export const apiClientV1 = createApiClient({
  baseURL: apiV1BaseURL,
  tenantId: envTenantId,
});

export const apiClientV2 = createApiClient({
  baseURL: apiV2BaseURL,
  isBearerToken: true,
  tenantId: envTenantId,
});
