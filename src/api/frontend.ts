import { apiClientV1 } from '../utils/apiClientFactory';
import { API } from './types/types';

export const frontend = {
  access: {
    keys: {
      create: (data: API.Frontend.Access.Keys.Create.Request): Promise<API.Frontend.Access.Keys.Create.Response> =>
        apiClientV1.postRequest<API.Frontend.Access.Keys.Create.Response>('/frontend/access/keys', { data }),
      list: (): Promise<API.Frontend.Access.Keys.List.Response> =>
        apiClientV1.getRequest<API.Frontend.Access.Keys.List.Response>('/frontend/access/keys'),
      regenerate: (key_id: string): Promise<API.Frontend.Access.Keys.Regenerate.Response> =>
        apiClientV1.postRequest<API.Frontend.Access.Keys.Regenerate.Response>(
          `/frontend/access/keys/${key_id}/regenerate`,
        ),
      revoke: (key_id: string): Promise<API.Frontend.Access.Keys.Revoke.Response> =>
        apiClientV1.deleteRequest(`/frontend/access/keys/${key_id}`),
    },
  },
  wallets: {
    usersLookup: (
      params: API.Frontend.Wallets.UsersLookup.Request,
    ): Promise<API.Frontend.Wallets.UsersLookup.Response> =>
      apiClientV1.getRequest<API.Frontend.Wallets.UsersLookup.Response>('/frontend/wallets/users/lookup', { params }),

    getAll: (params?: API.Frontend.Wallets.List.Request): Promise<API.Frontend.Wallets.List.Response> =>
      apiClientV1.getRequest<API.Frontend.Wallets.List.Response>('/frontend/wallets', { params }),

    create: (data: API.Frontend.Wallets.Create.Request): Promise<API.Frontend.Wallets.Create.Response> =>
      apiClientV1.postRequest<API.Frontend.Wallets.Create.Response>('/frontend/wallets', { data }),

    getById: ({
      wallet_id,
      ...params
    }: API.Frontend.Wallets.GetById.Request): Promise<API.Frontend.Wallets.GetById.Response> =>
      apiClientV1.getRequest<API.Frontend.Wallets.GetById.Response>(`/frontend/wallets/${wallet_id}`, { params }),

    update: ({
      wallet_id,
      ...data
    }: API.Frontend.Wallets.Update.Request): Promise<API.Frontend.Wallets.Update.Response> =>
      apiClientV1.patchRequest<API.Frontend.Wallets.Update.Response>(`/frontend/wallets/${wallet_id}`, { data }),

    getDashboard: ({
      wallet_id,
      ...params
    }: API.Frontend.Wallets.GetDashboard.Request): Promise<API.Frontend.Wallets.GetDashboard.Response> =>
      apiClientV1.getRequest<API.Frontend.Wallets.GetDashboard.Response>(`/frontend/wallets/${wallet_id}/dashboard`, {
        params,
      }),

    getBalance: ({
      wallet_id,
      ...params
    }: API.Frontend.Wallets.Balance.Request): Promise<API.Frontend.Wallets.Balance.Response> =>
      apiClientV1.getRequest<API.Frontend.Wallets.Balance.Response>(`/frontend/wallets/${wallet_id}/balance`, {
        params,
      }),

    addresses: {
      getAll: ({
        wallet_id,
        ...params
      }: API.Frontend.Wallets.Addresses.List.Request): Promise<API.Frontend.Wallets.Addresses.List.Response> =>
        apiClientV1.getRequest<API.Frontend.Wallets.Addresses.List.Response>(
          `/frontend/wallets/${wallet_id}/addresses`,
          { params },
        ),

      create: ({
        wallet_id,
        chain,
        ...data
      }: API.Frontend.Wallets.Addresses.Create.Request): Promise<API.Frontend.Wallets.Addresses.Create.Response> =>
        apiClientV1.postRequest<API.Frontend.Wallets.Addresses.Create.Response>(
          `/frontend/wallets/${wallet_id}/addresses/${chain}`,
          { data },
        ),
    },

    transactions: {
      getAll: ({
        wallet_id,
        ...params
      }: API.Frontend.Wallets.Transactions.List.Request): Promise<API.Frontend.Wallets.Transactions.List.Response> =>
        apiClientV1.getRequest<API.Frontend.Wallets.Transactions.List.Response>(
          `/frontend/wallets/${wallet_id}/transactions`,
          { params },
        ),

      exportCsv: ({
        wallet_id,
        ...params
      }: API.Frontend.Wallets.Transactions.ExportCsv.Request): Promise<API.Frontend.Wallets.Transactions.ExportCsv.Response> =>
        apiClientV1.getRequest<API.Frontend.Wallets.Transactions.ExportCsv.Response>(
          `/frontend/wallets/${wallet_id}/transactions/csv`,
          { params },
        ),

      getById: ({
        wallet_id,
        transaction_id,
      }: API.Frontend.Wallets.Transactions.GetById.Request): Promise<API.Frontend.Wallets.Transactions.GetById.Response> =>
        apiClientV1.getRequest<API.Frontend.Wallets.Transactions.GetById.Response>(
          `/frontend/wallets/${wallet_id}/transactions/${transaction_id}`,
        ),
    },

    users: {
      getAll: ({
        wallet_id,
        ...params
      }: API.Frontend.Wallets.Users.List.Request): Promise<API.Frontend.Wallets.Users.List.Response> =>
        apiClientV1.getRequest<API.Frontend.Wallets.Users.List.Response>(`/frontend/wallets/${wallet_id}/users`, {
          params,
        }),

      add: ({
        wallet_id,
        ...data
      }: API.Frontend.Wallets.Users.Add.Request): Promise<API.Frontend.Wallets.Users.Add.Response> =>
        apiClientV1.postRequest<API.Frontend.Wallets.Users.Add.Response>(`/frontend/wallets/${wallet_id}/users`, {
          data,
        }),

      updateRole: ({
        wallet_id,
        user_data_uuid,
        ...data
      }: API.Frontend.Wallets.Users.UpdateRole.Request): Promise<API.Frontend.Wallets.Users.UpdateRole.Response> =>
        apiClientV1.patchRequest<API.Frontend.Wallets.Users.UpdateRole.Response>(
          `/frontend/wallets/${wallet_id}/users/${user_data_uuid}`,
          { data },
        ),

      remove: ({
        wallet_id,
        user_data_uuid,
      }: API.Frontend.Wallets.Users.Remove.Request): Promise<API.Frontend.Wallets.Users.Remove.Response> =>
        apiClientV1.deleteRequest(`/frontend/wallets/${wallet_id}/users/${user_data_uuid}`),

      activate: ({
        wallet_id,
        user_data_uuid,
      }: API.Frontend.Wallets.Users.Activate.Request): Promise<API.Frontend.Wallets.Users.Activate.Response> =>
        apiClientV1.postRequest<API.Frontend.Wallets.Users.Activate.Response>(
          `/frontend/wallets/${wallet_id}/users/${user_data_uuid}/activate`,
        ),

      deactivate: ({
        wallet_id,
        user_data_uuid,
      }: API.Frontend.Wallets.Users.Deactivate.Request): Promise<API.Frontend.Wallets.Users.Deactivate.Response> =>
        apiClientV1.postRequest<API.Frontend.Wallets.Users.Deactivate.Response>(
          `/frontend/wallets/${wallet_id}/users/${user_data_uuid}/deactivate`,
        ),
    },

    invites: {
      accept: (
        data: API.Frontend.Wallets.Invites.Accept.Request,
      ): Promise<API.Frontend.Wallets.Invites.Accept.Response> =>
        apiClientV1.postRequest<API.Frontend.Wallets.Invites.Accept.Response>('/frontend/wallets/accept-invite', {
          data,
        }),

      decline: (
        data: API.Frontend.Wallets.Invites.Decline.Request,
      ): Promise<API.Frontend.Wallets.Invites.Decline.Response> =>
        apiClientV1.postRequest<API.Frontend.Wallets.Invites.Decline.Response>('/frontend/wallets/decline-invite', {
          data,
        }),

      info: (params: API.Frontend.Wallets.Invites.Info.Request): Promise<API.Frontend.Wallets.Invites.Info.Response> =>
        apiClientV1.getRequest<API.Frontend.Wallets.Invites.Info.Response>('/frontend/wallets/invite-info', { params }),

      getAll: ({
        wallet_id,
        ...params
      }: API.Frontend.Wallets.Invites.List.Request): Promise<API.Frontend.Wallets.Invites.List.Response> =>
        apiClientV1.getRequest<API.Frontend.Wallets.Invites.List.Response>(`/frontend/wallets/${wallet_id}/invites`, {
          params,
        }),

      create: ({
        wallet_id,
        ...data
      }: API.Frontend.Wallets.Invites.Create.Request): Promise<API.Frontend.Wallets.Invites.Create.Response> =>
        apiClientV1.postRequest<API.Frontend.Wallets.Invites.Create.Response>(
          `/frontend/wallets/${wallet_id}/invites`,
          { data },
        ),

      getById: ({
        wallet_id,
        invite_id,
      }: API.Frontend.Wallets.Invites.GetById.Request): Promise<API.Frontend.Wallets.Invites.GetById.Response> =>
        apiClientV1.getRequest<API.Frontend.Wallets.Invites.GetById.Response>(
          `/frontend/wallets/${wallet_id}/invites/${invite_id}`,
        ),

      cancel: ({
        wallet_id,
        invite_id,
      }: API.Frontend.Wallets.Invites.Cancel.Request): Promise<API.Frontend.Wallets.Invites.Cancel.Response> =>
        apiClientV1.deleteRequest(`/frontend/wallets/${wallet_id}/invites/${invite_id}`),
    },
  },
};
