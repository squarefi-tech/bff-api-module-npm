import { API } from './types';
import { apiClientV1 } from '../utils/apiClientFactory';
import { defaultPaginationParams } from '../constants';
import { makeSecureRequest } from '../utils/encrypt';
export const issuing = {
  cards: {
    create: {
      standAloneCard: (data: API.Cards.Create.StandAloneRequest) =>
        apiClientV1.postRequest<API.Cards.Create.StandAloneResponse>('/issuing/cards/create', { data }),
      subAccountCard: (data: API.Cards.Create.SubAccountRequest) =>
        apiClientV1.postRequest<API.Cards.Create.SubAccountResponse>('/issuing/cards/balance', { data }),
    },
    byWalletUuid: {
      getAll: (params: API.Cards.CardsList.Request.ByWalletUuid) =>
        apiClientV1.getRequest<API.Cards.CardsList.Response>('/issuing/cards', { params }),
      getBySubaccountType: (params: API.Cards.CardsList.Request.BySubaccountAndWalletUuid) =>
        apiClientV1.getRequest<API.Cards.CardsList.Response>('/issuing/cards', {
          params,
        }),
      getBySubAccount: (params: API.Cards.CardsList.Request.BySubAccountAndWalletId) =>
        apiClientV1.getRequest<API.Cards.CardsList.Response>('/issuing/cards', { params }),
    },
    // getById: (card_id: string) => apiClientV1.getRequest<API.Cards.IssuingCardDetailItem>(`/issuing/cards/${card_id}`),
    getById: async (card_id: string): Promise<API.Cards.IssuingCardDetailItem> => {
      const card = await apiClientV1.getRequest<API.Cards.IssuingCardDetailItem>(`/issuing/cards/${card_id}`);
      const subAccountData = await issuing.sub_accounts.getByUuid(card.fiat_account.id);
      return { ...card, fiat_account: { ...subAccountData, type: card.fiat_account.type } };
    },
    sensitiveData: {
      // get: (card_id: string) => apiClientV1.getRequest<API.Cards.SensitiveData>(`/issuing/cards/${card_id}/sensitive`), deprecated from v1.13.1
      encrypted: {
        secretKey: {
          get: async (card_id: string): Promise<API.Cards.SensitiveData> => {
            const serverPublicKeyEnv = process.env.SERVER_PUBLIC_KEY_BASE64;
            const callback = (props: API.Common.Encrypted.Request) =>
              apiClientV1.postRequest<API.Common.Encrypted.Response>(`/issuing/cards/${card_id}/sensitive/secretkey`, {
                data: props,
              });

            if (!serverPublicKeyEnv) {
              throw new Error('SERVER_PUBLIC_KEY_BASE64 is not set');
            }

            const encryptedData = await makeSecureRequest<API.Cards.SensitiveData>({
              callback,
              publicKey: serverPublicKeyEnv,
            });

            return encryptedData;
          },
        },
      },
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
    getBySubAccountId: (
      fiat_account_id: string,
      limit = defaultPaginationParams.limit,
      offset = defaultPaginationParams.offset
    ) =>
      apiClientV1.getRequest<API.Cards.TransactionsList>(`/issuing/transactions/`, {
        params: { limit, offset, fiat_account_id, new_scheme: true },
      }),
    csv: {
      getByCardId: (card_id: string) =>
        apiClientV1.getRequest<string>(`/issuing/transactions/csv`, {
          params: { card_id },
        }),
      getBySubAccountId: (sub_account_id: string) =>
        apiClientV1.getRequest<string>(`/issuing/sub_account/${sub_account_id}/transactions/csv`),
    },
  },
  sub_accounts: {
    list: {
      withCards: {
        getSinglecards: (wallet_uuid: string, limit: number, offset: number) =>
          apiClientV1.getRequest<API.Issuing.SubAccounts.SubAccountWithCards[]>(
            `/issuing/sub_account/list/${wallet_uuid}`,
            {
              params: { limit, offset, lt_cards_limit: 2, gt_cards_limit: 0, show_cards: true },
            }
          ),
        getAll: (wallet_uuid: string, limit: number, offset: number) =>
          apiClientV1.getRequest<API.Issuing.SubAccounts.SubAccountWithCards[]>(
            `/issuing/sub_account/list/${wallet_uuid}`,
            {
              params: { limit, offset, show_cards: true },
            }
          ),
      },
      withoutCards: {
        getAll: (wallet_uuid: string, limit: number, offset: number) =>
          apiClientV1.getRequest<API.Issuing.SubAccounts.SubAccount[]>(`/issuing/sub_account/list/${wallet_uuid}`, {
            params: { limit, offset },
          }),
      },
    },

    getByUuid: (uuid: string) =>
      apiClientV1.getRequest<API.Issuing.SubAccounts.SubAccount>(`/issuing/sub_account/${uuid}`),
    create: (wallet_id: string, program_id: string) =>
      apiClientV1.postRequest<API.Issuing.SubAccounts.SubAccount>(`/issuing/sub_account`, {
        data: { wallet_id, program_id },
      }),
    transactions: {
      get: (sub_account_id: string, limit?: number, offset?: number) =>
        apiClientV1.getRequest<API.Issuing.SubAccounts.TransactionList>(
          `/issuing/sub_account/${sub_account_id}/transactions`,
          {
            params: { limit, offset },
          }
        ),
    },
  },
  config: {
    programs: {
      getAll: () =>
        apiClientV1.getRequest<API.Issuing.Programs.Response>('/issuing/config/programs').then(({ data }) => data),
    },
  },
};
