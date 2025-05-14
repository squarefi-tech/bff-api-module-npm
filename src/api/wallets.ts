import { API } from './types/types';

import { apiClientV1, apiClientV2 } from '../utils/apiClientFactory';

import { defaultPaginationParams, WalletTypeValues } from '../constants';

export const wallets = {
  create: (type: WalletTypeValues) => apiClientV2.postRequest('/wallets', { data: { type } }),
  getAll: () => apiClientV2.getRequest<API.Wallets.WalletsList.Response>('/wallets'),
  getByUuid: (uuid: string) => apiClientV2.getRequest<API.Wallets.Wallet>(`/wallets/${uuid}`),
  addresses: {
    create: ({ wallet_uuid, chain, label }: API.Wallets.WalletChain.Create.Request) =>
      apiClientV1.postRequest<API.Wallets.WalletChain.Create.Response>(`/wallets/${wallet_uuid}/addresses/${chain}`, {
        data: { label },
      }),
    get: {
      byWalletUuid: {
        byChainId: (wallet_uuid: string, chain_id: number) =>
          apiClientV2.getRequest<API.Wallets.WalletChain.WalletChain>(`/wallets/${wallet_uuid}/addresses/${chain_id}`),
      },
    },
  },
  transactions: {
    byWalletUuid: {
      getAll: async ({
        wallet_uuid,
        limit = defaultPaginationParams.limit,
        offset = defaultPaginationParams.offset,
        ...params
      }: API.Wallets.WalletTransactions.TransactionList.Request) =>
        apiClientV2.getRequest<API.Wallets.WalletTransactions.TransactionList.Response>(
          `/wallets/${wallet_uuid}/transactions`,
          {
            params: { limit, offset, ...params },
          }
        ),
      getByUuid: ({ wallet_uuid, uuid }: API.Wallets.WalletTransactions.GetByUuid.Request) =>
        apiClientV2.getRequest<API.Wallets.WalletTransactions.DetailedTransaction>(
          `/wallets/${wallet_uuid}/transactions/${uuid}`
        ),
    },
    csv: {
      getByWalletUuid: (wallet_uuid: string) =>
        apiClientV1.getRequest<string>(`/wallets/transactions/${wallet_uuid}/csv`),
    },
  },
};
