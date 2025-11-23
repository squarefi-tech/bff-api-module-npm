import { API } from './types/types';

import { apiClientV2 } from '../utils/apiClientFactory';

import { defaultPaginationParams, WalletTypeValues } from '../constants';

export const wallets = {
  create: (type: WalletTypeValues): Promise<void> => apiClientV2.postRequest('/wallets', { data: { type } }),
  getAll: (params: API.Wallets.WalletsList.Request): Promise<API.Wallets.WalletsList.Response> =>
    apiClientV2.getRequest<API.Wallets.WalletsList.Response>('/wallets', { params }),
  getByUuid: (uuid: string): Promise<API.Wallets.Wallet> =>
    apiClientV2.getRequest<API.Wallets.Wallet>(`/wallets/${uuid}`),
  addresses: {
    create: (data: API.Wallets.WalletChain.Create.Request): Promise<API.Wallets.WalletChain.Create.Response> => {
      const { wallet_uuid, chain, label } = data;

      return apiClientV2.postRequest<API.Wallets.WalletChain.Create.Response>(
        `/wallets/${wallet_uuid}/addresses/${chain}`,
        { data: { label } },
      );
    },
    get: {
      byWalletUuid: {
        byChainId: (wallet_uuid: string, chain_id: number): Promise<API.Wallets.WalletChain.WalletChain> =>
          apiClientV2.getRequest<API.Wallets.WalletChain.WalletChain>(`/wallets/${wallet_uuid}/addresses/${chain_id}`),
      },
    },
  },
  transactions: {
    byWalletUuid: {
      getAll: async (
        data: API.Wallets.WalletTransactions.TransactionList.Request,
      ): Promise<API.Wallets.WalletTransactions.TransactionList.Response> => {
        const {
          wallet_uuid,
          limit = defaultPaginationParams.limit,
          offset = defaultPaginationParams.offset,
          ...params
        } = data;

        return apiClientV2.getRequest<API.Wallets.WalletTransactions.TransactionList.Response>(
          `/wallets/${wallet_uuid}/transactions`,
          { params: { limit, offset, ...params } },
        );
      },
      getByUuid: ({
        wallet_uuid,
        uuid,
      }: API.Wallets.WalletTransactions.GetByUuid.Request): Promise<API.Wallets.WalletTransactions.DetailedTransaction> =>
        apiClientV2.getRequest<API.Wallets.WalletTransactions.DetailedTransaction>(
          `/wallets/${wallet_uuid}/transactions/${uuid}`,
        ),
    },
    csv: {
      getByWalletUuid: ({
        wallet_uuid,
        ...params
      }: API.Wallets.WalletTransactions.TransactionList.ExportCsv.Request): Promise<API.Wallets.WalletTransactions.TransactionList.ExportCsv.Response> =>
        apiClientV2.getRequest<API.Wallets.WalletTransactions.TransactionList.ExportCsv.Response>(
          `/wallets/${wallet_uuid}/transactions/export/csv`,
          { params },
        ),
    },
  },
};
