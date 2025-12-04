/**
 * Примеры использования openapi-fetch клиента для KYC модуля
 * 
 * Демонстрирует работу с path параметрами в URL
 */

import { API } from '../types/types';
import { openApiClientV1, openApiClientV2 } from '../../utils/openapiClientFactory';
import { handleResponse } from '../../utils/openapiHelpers';

/**
 * Пример 1: POST запрос на V1 API
 * 
 * Старый способ (axios):
 * ```typescript
 * apiClientV1.postRequest<API.KYC.Sumsub.GenerateToken.Response>('/kyc/sumsub/generate_token', { data })
 * ```
 */
export const generateSumsubToken = async (
  data: API.KYC.Sumsub.GenerateToken.Request,
): Promise<API.KYC.Sumsub.GenerateToken.Response> => {
  return handleResponse(
    await openApiClientV1.POST('/kyc/sumsub/generate_token', {
      body: data,
    }),
  );
};

/**
 * Пример 2: GET запрос с path параметрами
 * 
 * Старый способ (axios):
 * ```typescript
 * apiClientV2.getRequest<API.KYC.Entity.Get.Response>(`/kyc/${wallet_id}/entity`)
 * ```
 * 
 * Новый способ использует типизированные path параметры:
 */
export const getKycEntity = async ({ wallet_id }: API.KYC.Entity.Get.Request): Promise<API.KYC.Entity.Get.Response> => {
  return handleResponse(
    await openApiClientV2.GET('/kyc/{wallet_id}/entity', {
      params: {
        path: { wallet_id },
      },
    }),
  );
};

/**
 * Пример 3: GET запрос с path параметрами для списка
 */
export const getAllKycRails = async ({
  wallet_id,
}: API.KYC.Rails.RailInfo.List.Request): Promise<API.KYC.Rails.RailInfo.List.Response> => {
  return handleResponse(
    await openApiClientV2.GET('/kyc/{wallet_id}/rails', {
      params: {
        path: { wallet_id },
      },
    }),
  );
};

/**
 * Пример 4: GET запрос с несколькими path параметрами
 */
export const getSingleKycRail = async ({
  wallet_id,
  rail_id,
}: API.KYC.Rails.RailInfo.SingleRail.Request): Promise<API.KYC.Rails.RailInfo.SingleRail.Response> => {
  return handleResponse(
    await openApiClientV2.GET('/kyc/{wallet_id}/rails/{rail_id}', {
      params: {
        path: { wallet_id, rail_id },
      },
    }),
  );
};

/**
 * Пример 5: POST запрос с path параметрами
 */
export const submitSingleKycRail = async ({
  wallet_id,
  rail_id,
}: API.KYC.Rails.Submit.Single.Request): Promise<API.KYC.Rails.Submit.Single.Response> => {
  return handleResponse(
    await openApiClientV2.POST('/kyc/{wallet_id}/rails/{rail_id}', {
      params: {
        path: { wallet_id, rail_id },
      },
    }),
  );
};

/**
 * Пример 6: POST запрос с path параметрами и body
 * 
 * Если endpoint требует body, он будет автоматически типизирован:
 */
export const confirmKycRailTerms = async ({
  wallet_id,
  rail_id,
  ...bodyData
}: API.KYC.Rails.Terms.Confirm.Request & { wallet_id: string; rail_id: string }): Promise<API.KYC.Rails.Terms.Confirm.Response> => {
  return handleResponse(
    await openApiClientV2.POST('/kyc/{wallet_id}/rails/{rail_id}/terms-and-conditions', {
      params: {
        path: { wallet_id, rail_id },
      },
      body: bodyData as API.KYC.Rails.Terms.Confirm.Request,
    }),
  );
};

/**
 * Пример 7: Работа с query параметрами (если они есть в API)
 * 
 * Если endpoint поддерживает query параметры:
 * ```typescript
 * const { data, error } = await openApiClientV2.GET('/some-endpoint', {
 *   params: {
 *     query: { limit: 10, offset: 0 },
 *   },
 * });
 * ```
 */

