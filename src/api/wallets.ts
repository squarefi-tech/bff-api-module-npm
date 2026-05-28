import { API } from './types/types';

import { apiClientV1Frontend } from '../utils/apiClientFactory';

import { defaultPaginationParams } from '../constants';

export const wallets = {
  create: (data?: API.Wallets.Wallet.Create.Request): Promise<API.Wallets.Wallet.Create.Response> =>
    apiClientV1Frontend.postRequest('/frontend/wallets', { data }),

  getAll: (params?: API.Wallets.WalletsList.Request): Promise<API.Wallets.WalletsList.Response> =>
    apiClientV1Frontend.getRequest<API.Wallets.WalletsList.Response>('/frontend/wallets', { params }),

  getByUuid: ({
    wallet_id,
    ...params
  }: API.Wallets.Wallet.GetByUuid.Request): Promise<API.Wallets.Wallet.GetByUuid.Response> =>
    apiClientV1Frontend.getRequest<API.Wallets.Wallet.GetByUuid.Response>(`/frontend/wallets/${wallet_id}`, {
      params,
    }),

  update: ({
    wallet_id,
    ...data
  }: API.Wallets.Wallet.Update.Request): Promise<API.Wallets.Wallet.Update.Response> =>
    apiClientV1Frontend.patchRequest<API.Wallets.Wallet.Update.Response>(`/frontend/wallets/${wallet_id}`, {
      data,
    }),

  getBalance: ({
    wallet_id,
    ...params
  }: API.Wallets.Balance.Request): Promise<API.Wallets.Balance.Response> =>
    apiClientV1Frontend.getRequest<API.Wallets.Balance.Response>(
      `/frontend/wallets/${wallet_id}/balance`,
      { params },
    ),

  getDashboard: ({
    wallet_id,
    ...params
  }: API.Wallets.Dashboard.Request): Promise<API.Wallets.Dashboard.Response> =>
    apiClientV1Frontend.getRequest<API.Wallets.Dashboard.Response>(
      `/frontend/wallets/${wallet_id}/dashboard`,
      { params },
    ),

  addresses: {
    getAll: ({
      wallet_id,
      ...params
    }: API.Wallets.WalletChain.GetAll.Request): Promise<API.Wallets.WalletChain.GetAll.Response> =>
      apiClientV1Frontend.getRequest<API.Wallets.WalletChain.GetAll.Response>(
        `/frontend/wallets/${wallet_id}/addresses`,
        { params },
      ),

    create: ({
      wallet_id,
      chain,
      ...data
    }: API.Wallets.WalletChain.Create.Request): Promise<API.Wallets.WalletChain.Create.Response> =>
      apiClientV1Frontend.postRequest<API.Wallets.WalletChain.Create.Response>(
        `/frontend/wallets/${wallet_id}/addresses/${chain}`,
        { data },
      ),
  },

  transactions: {
    getAll: ({
      wallet_id,
      limit = defaultPaginationParams.limit,
      offset = defaultPaginationParams.offset,
      ...params
    }: API.Wallets.WalletTransactions.TransactionList.Request): Promise<API.Wallets.WalletTransactions.TransactionList.Response> =>
      apiClientV1Frontend.getRequest<API.Wallets.WalletTransactions.TransactionList.Response>(
        `/frontend/wallets/${wallet_id}/transactions`,
        { params: { limit, offset, ...params } },
      ),

    getById: ({
      wallet_id,
      transaction_id,
    }: API.Wallets.WalletTransactions.GetById.Request): Promise<API.Wallets.WalletTransactions.GetById.Response> =>
      apiClientV1Frontend.getRequest<API.Wallets.WalletTransactions.GetById.Response>(
        `/frontend/wallets/${wallet_id}/transactions/${transaction_id}`,
      ),

    csv: ({
      wallet_id,
      ...params
    }: API.Wallets.WalletTransactions.TransactionList.ExportCsv.Request): Promise<API.Wallets.WalletTransactions.TransactionList.ExportCsv.Response> =>
      apiClientV1Frontend.getRequest<API.Wallets.WalletTransactions.TransactionList.ExportCsv.Response>(
        `/frontend/wallets/${wallet_id}/transactions/csv`,
        { params },
      ),
  },

  users: {
    lookup: (params: API.Wallets.Users.Lookup.Request): Promise<API.Wallets.Users.Lookup.Response> =>
      apiClientV1Frontend.getRequest<API.Wallets.Users.Lookup.Response>('/frontend/wallets/users/lookup', {
        params,
      }),

    getAll: ({
      wallet_id,
      ...params
    }: API.Wallets.Users.GetAll.Request): Promise<API.Wallets.Users.GetAll.Response> =>
      apiClientV1Frontend.getRequest<API.Wallets.Users.GetAll.Response>(
        `/frontend/wallets/${wallet_id}/users`,
        { params },
      ),

    add: ({
      wallet_id,
      ...data
    }: API.Wallets.Users.Add.Request): Promise<API.Wallets.Users.Add.Response> =>
      apiClientV1Frontend.postRequest<API.Wallets.Users.Add.Response>(
        `/frontend/wallets/${wallet_id}/users`,
        { data },
      ),

    updateRole: ({
      wallet_id,
      user_data_uuid,
      ...data
    }: API.Wallets.Users.UpdateRole.Request): Promise<API.Wallets.Users.UpdateRole.Response> =>
      apiClientV1Frontend.patchRequest<API.Wallets.Users.UpdateRole.Response>(
        `/frontend/wallets/${wallet_id}/users/${user_data_uuid}`,
        { data },
      ),

    remove: ({
      wallet_id,
      user_data_uuid,
    }: API.Wallets.Users.Remove.Request): Promise<API.Wallets.Users.Remove.Response> =>
      apiClientV1Frontend.deleteRequest(`/frontend/wallets/${wallet_id}/users/${user_data_uuid}`),

    activate: ({
      wallet_id,
      user_data_uuid,
    }: API.Wallets.Users.Activate.Request): Promise<API.Wallets.Users.Activate.Response> =>
      apiClientV1Frontend.postRequest<API.Wallets.Users.Activate.Response>(
        `/frontend/wallets/${wallet_id}/users/${user_data_uuid}/activate`,
      ),

    deactivate: ({
      wallet_id,
      user_data_uuid,
    }: API.Wallets.Users.Deactivate.Request): Promise<API.Wallets.Users.Deactivate.Response> =>
      apiClientV1Frontend.postRequest<API.Wallets.Users.Deactivate.Response>(
        `/frontend/wallets/${wallet_id}/users/${user_data_uuid}/deactivate`,
      ),
  },

  invites: {
    info: (params: API.Wallets.Invites.Info.Request): Promise<API.Wallets.Invites.Info.Response> =>
      apiClientV1Frontend.getRequest<API.Wallets.Invites.Info.Response>('/frontend/wallets/invite-info', {
        params,
      }),

    accept: (data: API.Wallets.Invites.Accept.Request): Promise<API.Wallets.Invites.Accept.Response> =>
      apiClientV1Frontend.postRequest<API.Wallets.Invites.Accept.Response>('/frontend/wallets/accept-invite', {
        data,
      }),

    decline: (data: API.Wallets.Invites.Decline.Request): Promise<API.Wallets.Invites.Decline.Response> =>
      apiClientV1Frontend.postRequest<API.Wallets.Invites.Decline.Response>(
        '/frontend/wallets/decline-invite',
        { data },
      ),

    getAll: ({
      wallet_id,
      ...params
    }: API.Wallets.Invites.GetAll.Request): Promise<API.Wallets.Invites.GetAll.Response> =>
      apiClientV1Frontend.getRequest<API.Wallets.Invites.GetAll.Response>(
        `/frontend/wallets/${wallet_id}/invites`,
        { params },
      ),

    create: ({
      wallet_id,
      ...data
    }: API.Wallets.Invites.Create.Request): Promise<API.Wallets.Invites.Create.Response> =>
      apiClientV1Frontend.postRequest<API.Wallets.Invites.Create.Response>(
        `/frontend/wallets/${wallet_id}/invites`,
        { data },
      ),

    getById: ({
      wallet_id,
      invite_id,
    }: API.Wallets.Invites.GetById.Request): Promise<API.Wallets.Invites.GetById.Response> =>
      apiClientV1Frontend.getRequest<API.Wallets.Invites.GetById.Response>(
        `/frontend/wallets/${wallet_id}/invites/${invite_id}`,
      ),

    delete: ({
      wallet_id,
      invite_id,
    }: API.Wallets.Invites.Delete.Request): Promise<API.Wallets.Invites.Delete.Response> =>
      apiClientV1Frontend.deleteRequest(`/frontend/wallets/${wallet_id}/invites/${invite_id}`),
  },
};
