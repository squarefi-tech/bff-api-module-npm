import { API } from './types';

import { apiClientV1, apiClientV2 } from '../utils/apiClientFactory';

export const kyc = {
  sumsub: {
    generate_token: (data: API.KYC.Sumsub.GenerateToken.Request) =>
      apiClientV1.postRequest<API.KYC.Sumsub.GenerateToken.Response>('/kyc/sumsub/generate_token', { data }),
  },
  rails: {
    info: {
      getAll: ({ wallet_id }: API.KYC.Rails.RailInfo.List.Request) =>
        apiClientV2.getRequest<API.KYC.Rails.RailInfo.List.Response>(`/kyc/${wallet_id}/rails`),
      getSingle: ({ wallet_id, rail_id }: API.KYC.Rails.RailInfo.SingleRail.Request) =>
        apiClientV2.getRequest<API.KYC.Rails.RailInfo.SingleRail.Response>(`/kyc/${wallet_id}/rails/${rail_id}`),
    },
    submit: {
      single: ({ wallet_id, rail_id }: API.KYC.Rails.Submit.Single.Request) =>
        apiClientV2.postRequest<API.KYC.Rails.Submit.Single.Response>(`/kyc/${wallet_id}/rails/${rail_id}`),
    },
  },
};
