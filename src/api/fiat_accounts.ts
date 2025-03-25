import { API } from './types';

import { apiClientV2, apiClientV1 } from '.';

export const fiat_accounts_v2 = {
  list: {
    withCards: {
      getAll: (wallet_uuid: string, limit: number, offset: number) =>
        apiClientV2.getRequest<API.FiatAccountsV2.FiatAccountsListWithCards>(`/fiat-accounts/${wallet_uuid}`, {
          params: { limit, offset, show_cards: true },
        }),
    },
    withoutCards: {
      getAll: (wallet_uuid: string, limit: number, offset: number) =>
        apiClientV2.getRequest<API.FiatAccountsV2.FiatAccountsListWithoutCards>(`/fiat-accounts/${wallet_uuid}`, {
          params: { limit, offset },
        }),
    },
  },

  getByUuid: ({ wallet_uuid, fiat_account_id }: API.FiatAccountsV2.ExtendedFiatAccount.Request) =>
    apiClientV2.getRequest<API.FiatAccountsV2.ExtendedFiatAccount.Response>(
      `/fiat-accounts/${wallet_uuid}/${fiat_account_id}`,
    ),
  create: ({ wallet_id, program_id }: API.FiatAccountsV2.CreateFiatAccount.Request) =>
    apiClientV2.postRequest<API.FiatAccountsV2.CreateFiatAccount.Response>(`/fiat-accounts/${wallet_id}`, {
      data: { program_id },
    }),
  transactions: {
    get: ({ fiat_account_id, wallet_uuid, limit, offset }: API.FiatAccountsV2.Transactions.TransactionList.Request) =>
      apiClientV2.getRequest<API.FiatAccountsV2.Transactions.TransactionList.Response>(
        `/fiat-accounts/${wallet_uuid}/${fiat_account_id}/transactions`,
        {
          params: { limit, offset },
        },
      ),
  },
};

export const fiat_accounts = {
  list: {
    withCards: {
      getSinglecards: (wallet_uuid: string, limit: number, offset: number) =>
        apiClientV1.getRequest<API.FiatAccounts.FiatAccountWithCards[]>(`/fiat_accounts/list/${wallet_uuid}`, {
          params: { limit, offset, lt_cards_limit: 2, gt_cards_limit: 0, show_cards: true },
        }),
      getAll: (wallet_uuid: string, limit: number, offset: number) =>
        apiClientV1.getRequest<API.FiatAccounts.FiatAccountWithCards[]>(`/fiat_accounts/list/${wallet_uuid}`, {
          params: { limit, offset, show_cards: true },
        }),
    },
    withoutCards: {
      getAll: (wallet_uuid: string, limit: number, offset: number) =>
        apiClientV1.getRequest<API.FiatAccounts.FiatAccount[]>(`/fiat_accounts/list/${wallet_uuid}`, {
          params: { limit, offset },
        }),
    },
  },

  getByUuid: (uuid: string) => apiClientV1.getRequest<API.FiatAccounts.FiatAccount>(`/fiat_accounts/${uuid}`),
  create: (wallet_id: string, program_id: string) =>
    apiClientV1.postRequest<API.FiatAccounts.FiatAccount>(`/fiat_accounts`, { data: { wallet_id, program_id } }),
  transactions: {
    get: (fiat_account_id: string, limit?: number, offset?: number) =>
      apiClientV1.getRequest<API.FiatAccounts.TransactionList>(`/fiat_accounts/${fiat_account_id}/transactions`, {
        params: { limit, offset },
      }),
  },
};
