import { API } from './types/types';

import { apiClientV1, apiClientV2 } from '../utils/apiClientFactory';

export const kyc = {
  dataCollection: {
    /** @deprecated KYC is keyed by the KYC entity now, not the wallet (SFI-1924). Use `kyc.entity.init`. */
    init: ({ wallet_id, type }: API.KYC.DataCollection.Init.Request): Promise<API.KYC.DataCollection.Init.Response> =>
      apiClientV2.postRequest<API.KYC.DataCollection.Init.Response>(`/kyc/init/${wallet_id}/${type}`),
    /** @deprecated KYC is keyed by the KYC entity now, not the wallet (SFI-1924). Use `kyc.entity.resume`. */
    resume: ({
      wallet_id,
      verification_ref,
    }: API.KYC.DataCollection.Resume.Request): Promise<API.KYC.DataCollection.Resume.Response> =>
      apiClientV2.postRequest<API.KYC.DataCollection.Resume.Response>(`/kyc/resume/${wallet_id}/${verification_ref}`),
  },
  sumsub: {
    generate_token: (data: API.KYC.Sumsub.GenerateToken.Request): Promise<API.KYC.Sumsub.GenerateToken.Response> =>
      apiClientV1.postRequest<API.KYC.Sumsub.GenerateToken.Response>('/kyc/sumsub/generate_token', { data }),
  },
  entity: {
    get: ({ wallet_id }: API.KYC.Entity.Get.Request): Promise<API.KYC.Entity.Get.Response> =>
      apiClientV2.getRequest<API.KYC.Entity.Get.Response>(`/kyc/${wallet_id}/entity`),
    create: (data: API.KYC.Entity.Create.Request): Promise<API.KYC.Entity.Create.Response> =>
      apiClientV2.postRequest<API.KYC.Entity.Create.Response>('/kyc/entities', { data }),
    getAll: (): Promise<API.KYC.Entity.List.Response> =>
      apiClientV2.getRequest<API.KYC.Entity.List.Response>('/kyc/entities'),
    getById: ({ kyc_entity_id }: API.KYC.Entity.GetById.Request): Promise<API.KYC.Entity.GetById.Response> =>
      apiClientV2.getRequest<API.KYC.Entity.GetById.Response>(`/kyc/entities/${kyc_entity_id}`),
    init: ({ kyc_entity_id, ...params }: API.KYC.Entity.Init.Request): Promise<API.KYC.Entity.Init.Response> =>
      apiClientV2.postRequest<API.KYC.Entity.Init.Response>(`/kyc/entities/${kyc_entity_id}/init`, { params }),
    resume: ({
      kyc_entity_id,
      verification_ref,
    }: API.KYC.Entity.Resume.Request): Promise<API.KYC.Entity.Resume.Response> =>
      apiClientV2.postRequest<API.KYC.Entity.Resume.Response>(
        `/kyc/entities/${kyc_entity_id}/resume/${verification_ref}`,
      ),
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
    terms: {
      confirm: ({
        wallet_id,
        rail_id,
      }: API.KYC.Rails.Terms.Confirm.Request): Promise<API.KYC.Rails.Terms.Confirm.Response> =>
        apiClientV2.postRequest<API.KYC.Rails.Terms.Confirm.Response>(
          `/kyc/${wallet_id}/rails/${rail_id}/terms-and-conditions`,
        ),
    },
  },
};
