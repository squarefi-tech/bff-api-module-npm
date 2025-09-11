/* eslint-disable no-console */
import { isTMA } from '@telegram-apps/sdk-react';
import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { telegramSignUpPath, telegramSignInPath, refreshTokenPath } from '../api/auth';

import { AppEnviroment, ResponseStatus } from '../constants';

import { deleteTokens, getTokens, refreshTokens } from './tokensFactory';

// eslint-disable-next-line no-constant-condition

const apiV1BaseURL = process.env.API_URL ?? 'ENV variable API_URL is not defined';
const apiV2BaseURL = process.env.API_V2_URL ?? 'ENV variable API_V2_URL is not defined';
const apiTOTPBaseURL = process.env.API_TOTP_URL ?? 'ENV variable API_TOTP_URL is not defined';
const envTenantId = process.env.TENANT_ID ?? 'ENV variable TENANT_ID is not defined';
const envLogoutURL = process.env.LOGOUT_URL ?? '/auth/logout';

type AxiosError = {
  response: AxiosResponse;
  config: InternalAxiosRequestConfig;
};

type CreateApiClientOptions = {
  baseURL: string;
  tenantId: string;
  isBearerToken?: boolean;
};

type RequestQueueItem = {
  resolve: Function;
  reject: Function;
};

let isTokenRefreshing = false;
let requestQueue: RequestQueueItem[] = [];

export const createApiClient = ({ baseURL, isBearerToken, tenantId }: CreateApiClientOptions) => {
  const instance = axios.create({
    baseURL,
    timeout: 60000,
  });

  instance.interceptors.request.use((config) => {
    const { access_token } = getTokens();

    const modifiedHeaders = {
      ...config.headers,
      'Content-Type': 'application/json',
      'x-tenant-id': tenantId,
    };

    if (access_token) {
      const authHeader = isBearerToken ? `Bearer ${access_token}` : access_token;
      modifiedHeaders.Authorization = authHeader;
    }

    config.context = { ...config.context, appEnvironment: isTMA() ? AppEnviroment.TELEGRAM : AppEnviroment.WEB };

    return { ...config, headers: modifiedHeaders } as unknown as InternalAxiosRequestConfig;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (typeof window === 'undefined') {
        return Promise.reject(error);
      }
      if (error?.response?.status === ResponseStatus.UNAUTHORIZED) {
        const { response, config: failedRequestConfig } = error;
        const { refresh_token } = getTokens();
        const isRetryRequest = failedRequestConfig.context?.isRetryRequest;

        const isRefreshTokenRequest = failedRequestConfig.url?.includes(refreshTokenPath);
        const isTelegramSignInRequest = failedRequestConfig.url?.includes(telegramSignInPath);
        const isTelegramSignUpRequest = failedRequestConfig.url?.includes(telegramSignUpPath);
        const isRefreshNotRequired = !refresh_token && !isTMA();
        const isLogoutNeccesary =
          isRefreshNotRequired ||
          isTelegramSignInRequest ||
          isTelegramSignUpRequest ||
          isRefreshTokenRequest ||
          isRetryRequest;

        const isRefreshAvailable = !isTokenRefreshing && !isRefreshNotRequired;

        if (isLogoutNeccesary) {
          if (typeof window !== 'undefined') {
            window.location.href = envLogoutURL;
            deleteTokens();
          }
          requestQueue = [];
          return Promise.reject(response);
        }
        if (isRefreshAvailable) {
          isTokenRefreshing = true;
          refreshTokens()
            .then((data) => {
              if (data?.access_token) {
                requestQueue.forEach((request) => request.resolve());
                requestQueue = [];
              }
            })
            .catch((tokenRefreshError) => {
              if (typeof window !== 'undefined') {
                window.location.href = envLogoutURL;
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
              failedRequestConfig.context = { ...failedRequestConfig.context, isRetryRequest: true };
              return res(instance(failedRequestConfig));
            },
            reject: () => rej(instance(failedRequestConfig)),
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

export const apiClientTOTP = createApiClient({
  baseURL: apiTOTPBaseURL,
  isBearerToken: true,
  tenantId: envTenantId,
});
