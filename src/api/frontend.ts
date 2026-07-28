import { apiClientV1, apiClientV1Frontend } from '../utils/apiClientFactory';
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
  // Card money movement. Both card-level methods are thin wrappers the backend resolves to the
  // card's sub-account, so they share the sub-account order types, validation and program routing.
  // All four require the ADMIN role on the owning wallet — the card's wallet for `cards.*`, the
  // sub-account's wallet for `subAccounts.*`.
  issuing: {
    cards: {
      deposit: ({
        card_id,
        ...data
      }: API.Frontend.Issuing.Cards.Deposit.Request): Promise<API.Frontend.Issuing.Cards.Deposit.Response> =>
        apiClientV1Frontend.postRequest<API.Frontend.Issuing.Cards.Deposit.Response>(
          `/frontend/issuing/cards/${card_id}/deposit`,
          { data },
        ),
      withdraw: ({
        card_id,
        ...data
      }: API.Frontend.Issuing.Cards.Withdraw.Request): Promise<API.Frontend.Issuing.Cards.Withdraw.Response> =>
        apiClientV1Frontend.postRequest<API.Frontend.Issuing.Cards.Withdraw.Response>(
          `/frontend/issuing/cards/${card_id}/withdraw`,
          { data },
        ),
    },
    subAccounts: {
      deposit: ({
        sub_account_id,
        ...data
      }: API.Frontend.Issuing.SubAccounts.Deposit.Request): Promise<API.Frontend.Issuing.SubAccounts.Deposit.Response> =>
        apiClientV1Frontend.postRequest<API.Frontend.Issuing.SubAccounts.Deposit.Response>(
          `/frontend/issuing/sub-accounts/${sub_account_id}/deposit`,
          { data },
        ),
      // Concurrent withdrawals on the same sub-account are rejected with `409`. The currency is
      // taken from the sub-account, so only the amount is needed.
      withdraw: ({
        sub_account_id,
        ...data
      }: API.Frontend.Issuing.SubAccounts.Withdraw.Request): Promise<API.Frontend.Issuing.SubAccounts.Withdraw.Response> =>
        apiClientV1Frontend.postRequest<API.Frontend.Issuing.SubAccounts.Withdraw.Response>(
          `/frontend/issuing/sub-accounts/${sub_account_id}/withdraw`,
          { data },
        ),
    },
  },
};
