import { fiat_accounts } from './fiat_accounts';
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
    getByWalletUuid: (params: API.Cards.CardsList.Request.ByWalletUuid) =>
      apiClientV1.getRequest<API.Cards.CardsList.Response>('/issuing/cards', { params }),
    getByFiatAccountAndWalletId: (params: API.Cards.CardsList.Request.ByFiatAccountAndWalletId) =>
      apiClientV1.getRequest<API.Cards.CardsList.Response>('/issuing/cards', { params }),
    getById: async (card_id: string): Promise<API.Cards.CardDetailItem> => {
      const card = await apiClientV1.getRequest<API.Cards.CardDetailItem>(`/issuing/cards/${card_id}`);
      const fiatAccountData = await fiat_accounts.getByUuid(card.fiat_account.id);

      // const { data: fiatAccountData } = await fiat_accounts.getByUuid({ V2 API FIAT ACCOUNTS
      //   wallet_uuid: card.fiat_account.wallet_id,
      //   fiat_account_id: card.fiat_account.id,
      // });
      return { ...card, fiat_account: { ...fiatAccountData, type: card.fiat_account.type } };
    },
    sensitiveData: {
      get: (card_id: string) => apiClientV1.getRequest<API.Cards.SensitiveData>(`/issuing/cards/${card_id}/sensitive`),
      otp: {
        // have to update
        get: (card_id: string) => apiClientV1.getRequest<API.Cards.OTP>(`/vcards/cards/${card_id}/sensitive/otp`),
      },
    },
    close: (card_id: string) => apiClientV1.deleteRequest(`/issuing/cards/${card_id}`),
    freeze: (card_id: string) => apiClientV1.patchRequest<API.Cards.CardDetailItem>(`/issuing/cards/${card_id}/freeze`),
    unfreeze: (card_id: string) =>
      apiClientV1.patchRequest<API.Cards.CardDetailItem>(`/issuing/cards/${card_id}/unfreeze`),
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
      getAll: () => apiClientV1.getRequest<API.Issuing.Programs.Response>('/issuing/config/programs'),
    },
  },
};
