import { API } from './types/types';

import { apiClientV1, apiClientV1Native, apiClientV2 } from '../utils/apiClientFactory';

import { defaultPaginationParams, WalletTypeValues } from '../constants';

export const wallets = {
  create: (data: API.Wallets.Wallet.Create.Request): Promise<API.Wallets.Wallet.Create.Response> =>
    apiClientV2.postRequest('/wallets', { data }),
  getAll: (params?: API.Wallets.WalletsList.Request): Promise<API.Wallets.WalletsList.Response> =>
    apiClientV2.getRequest<API.Wallets.WalletsList.Response>('/wallets', { params }),
  getByUuid: ({ wallet_id }: API.Wallets.Wallet.GetByUuid.Request): Promise<API.Wallets.Wallet.GetByUuid.Response> =>
    apiClientV2.getRequest<API.Wallets.Wallet.GetByUuid.Response>(`/wallets/${wallet_id}`),
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
  statementPdf: {
    getByWalletUuid: ({
      wallet_uuid,
      ...params
    }: API.Wallets.WalletTransactions.StatementPdf.Request): Promise<API.Wallets.WalletTransactions.StatementPdf.Response> =>
      apiClientV1Native.getRequest<API.Wallets.WalletTransactions.StatementPdf.Response>(
        `/wallets/transactions/${wallet_uuid}/statement-pdf`,
        { params, responseType: 'blob' },
      ),
  },
};
