import { API } from './types';

import { apiClientV1 } from '../utils/apiClientFactory';

import { defaultPaginationParams } from '../constants';

export const issuing = {
  cards: {
    create: {
      standAloneCard: (data: API.Cards.Create.StandAloneRequest) =>
        apiClientV1.postRequest<API.Cards.Create.StandAloneResponse>('/issuing/cards/create', { data }),
      fiatAccountCard: (data: API.Cards.Create.FiatAccountRequest) =>
        apiClientV1.postRequest<API.Cards.Create.FiatAccountResponse>('/issuing/cards/balance', { data }),
    },
    byWalletUuid: {
      getAll: (params: API.Cards.CardsList.Request.ByWalletUuid) =>
        apiClientV1.getRequest<API.Cards.CardsList.Response>('/issuing/cards', { params }),
      getBySubaccountType: (params: API.Cards.CardsList.Request.BySubaccountAndWalletUuid) =>
        apiClientV1.getRequest<API.Cards.CardsList.Response>('/issuing/cards', {
          params,
        }),
      getByFiatAccount: (params: API.Cards.CardsList.Request.ByFiatAccountAndWalletId) =>
        apiClientV1.getRequest<API.Cards.CardsList.Response>('/issuing/cards', { params }),
    },
    getById: (card_id: string) => apiClientV1.getRequest<API.Cards.IssuingCardDetailItem>(`/issuing/cards/${card_id}`),
    sensitiveData: {
      get: (card_id: string) => apiClientV1.getRequest<API.Cards.SensitiveData>(`/issuing/cards/${card_id}/sensitive`),
      otp: {
        // have to update
        get: (card_id: string) => apiClientV1.getRequest<API.Cards.OTP>(`/vcards/cards/${card_id}/sensitive/otp`),
      },
    },
    freeze: (card_id: string) =>
      apiClientV1.patchRequest<API.Cards.IssuingCardDetailItem>(`/issuing/cards/${card_id}/freeze`),
    unfreeze: (card_id: string) =>
      apiClientV1.patchRequest<API.Cards.IssuingCardDetailItem>(`/issuing/cards/${card_id}/unfreeze`),
    close: (card_id: string) => apiClientV1.deleteRequest(`/issuing/cards/${card_id}`),
    limits: {
      update: (card_id: string, data: API.Cards.Limits.UpdateRequest) =>
        apiClientV1.patchRequest<API.Cards.IssuingCardDetailItem>(`/issuing/cards/${card_id}/limits`, { data }),
    },
    rename: (card_id: string, nick_name: string) =>
      apiClientV1.patchRequest<API.Cards.IssuingCardDetailItem>(`/issuing/cards/${card_id}/update`, {
        data: { nick_name, request_id: crypto.randomUUID() },
      }),
  },
  transactions: {
    getByCardId: (card_id: string, limit = defaultPaginationParams.limit, offset = defaultPaginationParams.offset) =>
      apiClientV1.getRequest<API.Cards.TransactionsList>(`/issuing/transactions/`, {
        params: { limit, offset, card_id, new_scheme: true },
      }),
    getByFiatAccountId: (
      fiat_account_id: string,
      limit = defaultPaginationParams.limit,
      offset = defaultPaginationParams.offset
    ) =>
      apiClientV1.getRequest<API.Cards.TransactionsList>(`/issuing/transactions/`, {
        params: { limit, offset, fiat_account_id, new_scheme: true },
      }),
  },
  config: {
    programs: {
      getAll: () =>
        apiClientV1.getRequest<API.Issuing.Programs.Response>('/issuing/config/programs').then(({ data }) => data),
    },
  },
};
