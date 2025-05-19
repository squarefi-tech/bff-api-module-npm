import { API } from './types/types';

import { apiClientV1, apiClientV2 } from '../utils/apiClientFactory';

export const kyc = {
  sumsub: {
    generate_token: (data: API.KYC.Sumsub.GenerateToken.Request): Promise<API.KYC.Sumsub.GenerateToken.Response> =>
      apiClientV1.postRequest<API.KYC.Sumsub.GenerateToken.Response>('/kyc/sumsub/generate_token', { data }),
  },
  entity: {
    get: ({ wallet_id }: API.KYC.Entity.Get.Request): Promise<API.KYC.Entity.Get.Response> =>
      apiClientV2.getRequest<API.KYC.Entity.Get.Response>(`/kyc/${wallet_id}/entity`),
  },
  rails: {
    info: {
      getAll: ({ wallet_id }: API.KYC.Rails.RailInfo.List.Request): Promise<API.KYC.Rails.RailInfo.List.Response> =>
        apiClientV2.getRequest<API.KYC.Rails.RailInfo.List.Response>(`/kyc/${wallet_id}/rails`),
      getSingle: ({
        wallet_id,
        rail_id,
      }: API.KYC.Rails.RailInfo.SingleRail.Request): Promise<API.KYC.Rails.RailInfo.SingleRail.Response> =>
        apiClientV2.getRequest<API.KYC.Rails.RailInfo.SingleRail.Response>(`/kyc/${wallet_id}/rails/${rail_id}`),
    },
    submit: {
      single: ({
        wallet_id,
        rail_id,
      }: API.KYC.Rails.Submit.Single.Request): Promise<API.KYC.Rails.Submit.Single.Response> =>
        apiClientV2.postRequest<API.KYC.Rails.Submit.Single.Response>(`/kyc/${wallet_id}/rails/${rail_id}`),
    },
  },
};
