import { API } from './types';

import { apiClientV2 } from '../utils/apiClientFactory';

import { defaultPaginationParams, WalletTypeValues } from '../constants';

export const wallets = {
  create: (type: WalletTypeValues) => apiClientV2.postRequest('/wallets', { data: { type } }).then(({ data }) => data),
  getAll: () => apiClientV2.getRequest<API.Wallets.WalletsList.Response>('/wallets').then(({ data }) => data),
  getByUuid: (uuid: string) => apiClientV2.getRequest<API.Wallets.Wallet>(`/wallets/${uuid}`).then(({ data }) => data),
  addresses: {
    create: ({ wallet_uuid, chain, label }: API.Wallets.WalletChain.Create.Request) =>
      apiClientV2
        .postRequest<API.Wallets.WalletChain.Create.Response>(`/wallets/${wallet_uuid}/addresses/${chain}`, {
          data: { label },
        })
        .then(({ data }) => data),
    get: {
      byWalletUuid: {
        byChainId: (wallet_uuid: string, chain_id: number) =>
          apiClientV2
            .getRequest<API.Wallets.WalletChain.WalletChain>(`/wallets/${wallet_uuid}/addresses/${chain_id}`)
            .then(({ data }) => data),
      },
    },
  },
  transactions: {
    getByWalletUuid: async (
      wallet_uuid: string,
      limit = defaultPaginationParams.limit,
      offset = defaultPaginationParams.offset
    ) =>
      apiClientV2
        .getRequest<API.Wallets.WalletTransactions.TransactionList.Response>(`/wallets/${wallet_uuid}/transactions`, {
          params: { limit, offset },
        })
        .then(({ data }) => data),
  },
};
