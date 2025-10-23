import { API } from './types/types';
import { apiClientV1 } from '../utils/apiClientFactory';
import { defaultPaginationParams } from '../constants';
import { makeSecureRequest } from '../utils/encrypt';

export const issuing = {
  cards: {
    create: {
      standAloneCard: {
        prepaid: (data: API.Cards.Create.StandAloneRequest): Promise<API.Cards.Create.StandAloneResponse> =>
          apiClientV1.postRequest<API.Cards.Create.StandAloneResponse>('/issuing/cards/create', { data }),
        balance: async (
          data: API.Cards.Create.StandAloneRequest,
        ): Promise<API.Cards.Create.ExtendedSubAccountResponse> => {
          const { id: sub_account_id } = await issuing.sub_accounts.create(data.wallet_id, data.program_id);

          const response = await apiClientV1.postRequest<API.Cards.Create.SubAccountResponse>(
            '/issuing/cards/balance',
            {
              data: {
                ...data,
                sub_account_id,
              },
            },
          );

          return {
            ...response,
            sub_account_id,
          };
        },
      },
      subAccountCard: async (
        data: API.Cards.Create.SubAccountRequest,
      ): Promise<API.Cards.Create.ExtendedSubAccountResponse> => {
        const response = await apiClientV1.postRequest<API.Cards.Create.SubAccountResponse>('/issuing/cards/balance', {
          data,
        });
        return {
          ...response,
          sub_account_id: data.sub_account_id,
        };
      },
    },
    byWalletUuid: {
      getAll: (params: API.Cards.CardsList.Request.ByWalletUuid): Promise<API.Cards.CardsList.Response> =>
        apiClientV1.getRequest<API.Cards.CardsList.Response>('/issuing/cards', {
          params,
        }),
      getBySubaccountType: (
        params: API.Cards.CardsList.Request.BySubaccountAndWalletUuid,
      ): Promise<API.Cards.CardsList.Response> =>
        apiClientV1.getRequest<API.Cards.CardsList.Response>('/issuing/cards', {
          params,
        }),
      getBySubAccount: (
        params: API.Cards.CardsList.Request.BySubAccountAndWalletId,
      ): Promise<API.Cards.CardsList.Response> =>
        apiClientV1.getRequest<API.Cards.CardsList.Response>('/issuing/cards', {
          params,
        }),
    },
    // getById: (card_id: string) => apiClientV1.getRequest<API.Cards.IssuingCardDetailItem>(`/issuing/cards/${card_id}`),
    getById: async (card_id: string): Promise<API.Cards.IssuingCardDetailItem> => {
      const card = await apiClientV1.getRequest<API.Cards.IssuingCardDetailItem>(`/issuing/cards/${card_id}`);
      const subAccountData = await issuing.sub_accounts.getByUuid(card.fiat_account.id);
      return {
        ...card,
        fiat_account: { ...subAccountData, type: card.fiat_account.type },
      };
    },
    sensitiveData: {
      // get: (card_id: string) => apiClientV1.getRequest<API.Cards.SensitiveData>(`/issuing/cards/${card_id}/sensitive`), deprecated from v1.13.1
      encrypted: {
        secretKey: {
          get: async (card_id: string): Promise<API.Cards.SensitiveData> => {
            const serverPublicKeyEnv = process.env.SERVER_PUBLIC_KEY_BASE64;
            const callback = (props: API.Common.Encrypted.Request): Promise<API.Common.Encrypted.Response> =>
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
        get: (card_id: string): Promise<API.Cards.OTP> =>
          apiClientV1.getRequest<API.Cards.OTP>(`/vcards/cards/${card_id}/sensitive/otp`),
      },
    },
    freeze: (card_id: string): Promise<API.Cards.IssuingCardDetailItem> =>
      apiClientV1.patchRequest<API.Cards.IssuingCardDetailItem>(`/issuing/cards/${card_id}/freeze`),
    unfreeze: (card_id: string): Promise<API.Cards.IssuingCardDetailItem> =>
      apiClientV1.patchRequest<API.Cards.IssuingCardDetailItem>(`/issuing/cards/${card_id}/unfreeze`),
    close: (card_id: string): Promise<void> => apiClientV1.deleteRequest(`/issuing/cards/${card_id}`),
    limits: {
      update: (card_id: string, data: API.Cards.Limits.UpdateRequest): Promise<API.Cards.IssuingCardDetailItem> =>
        apiClientV1.patchRequest<API.Cards.IssuingCardDetailItem>(`/issuing/cards/${card_id}/limits`, { data }),
    },
    rename: (card_id: string, nick_name: string): Promise<API.Cards.IssuingCardDetailItem> =>
      apiClientV1.patchRequest<API.Cards.IssuingCardDetailItem>(`/issuing/cards/${card_id}/update`, {
        data: { nick_name, request_id: crypto.randomUUID() },
      }),
  },
  transactions: {
    getByCardId: (
      card_id: string,
      limit = defaultPaginationParams.limit,
      offset = defaultPaginationParams.offset,
    ): Promise<API.Cards.TransactionsList> =>
      apiClientV1.getRequest<API.Cards.TransactionsList>(`/issuing/transactions/`, {
        params: { limit, offset, card_id, new_scheme: true },
      }),
    getBySubAccountId: (
      fiat_account_id: string,
      limit = defaultPaginationParams.limit,
      offset = defaultPaginationParams.offset,
    ): Promise<API.Cards.TransactionsList> =>
      apiClientV1.getRequest<API.Cards.TransactionsList>(`/issuing/transactions/`, {
        params: { limit, offset, fiat_account_id, new_scheme: true },
      }),
    csv: {
      getByCardId: (card_id: string): Promise<string> =>
        apiClientV1.getRequest<string>(`/issuing/transactions/csv`, {
          params: { card_id },
        }),
      getBySubAccountId: (sub_account_id: string): Promise<string> =>
        apiClientV1.getRequest<string>(`/issuing/sub_account/${sub_account_id}/transactions/csv`),
    },
  },
  sub_accounts: {
    list: {
      withCards: {
        getSinglecards: (
          wallet_uuid: string,
          limit: number,
          offset: number,
        ): Promise<API.Issuing.SubAccounts.WithCards.Response> =>
          apiClientV1.getRequest<API.Issuing.SubAccounts.WithCards.Response>(
            `/issuing/sub_account/list/${wallet_uuid}`,
            {
              params: {
                limit,
                offset,
                lt_cards_limit: 2,
                gt_cards_limit: 0,
                show_cards: true,
                pagination: true,
              },
            },
          ),
        getAll: (
          wallet_uuid: string,
          limit: number,
          offset: number,
        ): Promise<API.Issuing.SubAccounts.WithCards.Response> =>
          apiClientV1.getRequest<API.Issuing.SubAccounts.WithCards.Response>(
            `/issuing/sub_account/list/${wallet_uuid}`,
            {
              params: { limit, offset, show_cards: true, pagination: true },
            },
          ),
      },
      withoutCards: {
        getAll: ({
          wallet_uuid,
          ...params
        }: API.Issuing.SubAccounts.WithoutCards.Request): Promise<API.Issuing.SubAccounts.WithoutCards.Response> =>
          apiClientV1.getRequest<API.Issuing.SubAccounts.WithoutCards.Response>(
            `/issuing/sub_account/list/${wallet_uuid}`,
            {
              params: { ...params, pagination: true },
            },
          ),
      },
    },

    getByUuid: (uuid: string): Promise<API.Issuing.SubAccounts.SubAccount> =>
      apiClientV1.getRequest<API.Issuing.SubAccounts.SubAccount>(`/issuing/sub_account/${uuid}`),
    create: (wallet_id: string, program_id: string): Promise<API.Issuing.SubAccounts.SubAccount> =>
      apiClientV1.postRequest<API.Issuing.SubAccounts.SubAccount>(`/issuing/sub_account`, {
        data: { wallet_id, program_id },
      }),
    transactions: {
      get: ({
        sub_account_id,
        ...params
      }: API.Issuing.SubAccounts.TransactionList.Request): Promise<API.Issuing.SubAccounts.TransactionList.Response> =>
        apiClientV1.getRequest<API.Issuing.SubAccounts.TransactionList.Response>(
          `/issuing/sub_account/${sub_account_id}/transactions`,
          {
            params,
          },
        ),
    },
  },
  config: {
    programs: {
      getAll: (params: API.Issuing.Programs.Request): Promise<API.Issuing.Programs.Response> =>
        apiClientV1.getRequest<API.Issuing.Programs.Response>('/issuing/config/programs', { params }),
    },
  },
};
