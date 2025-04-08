import { API } from './types';

import { apiClientV1 } from '../utils/apiClientFactory';

import { defaultPaginationParams, SubAccountType } from '../constants';
import { fiat_accounts } from './fiat_accounts';
import {
  arrayBufferToBase64,
  decodePEMFromBase64,
  decryptSensitiveData,
  generate256bitSecretKey,
} from '../utils/common';

export const issuing = {
  cards: {
    create: {
      standAloneCard: (data: API.Cards.Create.StandAloneRequest) =>
        apiClientV1.postRequest<API.Cards.Create.StandAloneResponse>('/issuing/cards/create', { data }),
      fiatAccountCard: (data: API.Cards.Create.FiatAccountRequest) =>
        apiClientV1.postRequest<API.Cards.Create.FiatAccountResponse>('/issuing/cards/balance', { data }),
    },
    byWalletUuid: {
      getAll: (params: API.Cards.CardsList.Request.ByWalletUuid) =>
        apiClientV1.getRequest<API.Cards.CardsList.Response>('/issuing/cards', { params }),
      getBySubaccountType: (params: API.Cards.CardsList.Request.BySubaccountAndWalletUuid) =>
        apiClientV1.getRequest<API.Cards.CardsList.Response>('/issuing/cards', {
          params,
        }),
      getByFiatAccount: (params: API.Cards.CardsList.Request.ByFiatAccountAndWalletId) =>
        apiClientV1.getRequest<API.Cards.CardsList.Response>('/issuing/cards', { params }),
    },
    // getById: (card_id: string) => apiClientV1.getRequest<API.Cards.IssuingCardDetailItem>(`/issuing/cards/${card_id}`),
    getById: async (card_id: string): Promise<API.Cards.IssuingCardDetailItem> => {
      const card = await apiClientV1.getRequest<API.Cards.IssuingCardDetailItem>(`/issuing/cards/${card_id}`);
      const fiatAccountData = await fiat_accounts.getByUuid(card.fiat_account.id);
      return { ...card, fiat_account: { ...fiatAccountData, type: card.fiat_account.type } };
    },
    sensitiveData: {
      get: (card_id: string) => apiClientV1.getRequest<API.Cards.SensitiveData>(`/issuing/cards/${card_id}/sensitive`),
      encrypted: {
        secretKey: {
          get: async (card_id: string) => {
            const serverPublicKey = process.env.SERVER_PUBLIC_KEY_BASE64;
            if (!serverPublicKey) {
              throw new Error('SERVER_PUBLIC_KEY_BASE64 is not set');
            }
            const secretKey = generate256bitSecretKey();
            const secretKeyBase64 = arrayBufferToBase64(secretKey);
            const JSEncrypt = (await import('jsencrypt')).default;
            const encrypt = new JSEncrypt();
            const serverPublicKeyPEM = decodePEMFromBase64(serverPublicKey);
            encrypt.setPublicKey(serverPublicKeyPEM);

            const payload = {
              key: secretKeyBase64,
              timestamp: Date.now(),
            };

            const encrypted_key = encrypt.encrypt(JSON.stringify(payload));

            const response = await apiClientV1.postRequest<API.Cards.SensitiveDataEncrypted>(
              `/issuing/cards/${card_id}/sensitive/secretkey`,
              {
                data: {
                  encrypted_key,
                },
              }
            );
            if (response.success && response.encrypted && response.data && response.iv) {
              const decryptedData = await decryptSensitiveData(response.data, response.iv, secretKey);

              return decryptedData;
            }
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
    getByFiatAccountId: (
      fiat_account_id: string,
      limit = defaultPaginationParams.limit,
      offset = defaultPaginationParams.offset
    ) =>
      apiClientV1.getRequest<API.Cards.TransactionsList>(`/issuing/transactions/`, {
        params: { limit, offset, fiat_account_id, new_scheme: true },
      }),
  },
  config: {
    programs: {
      getAll: () =>
        apiClientV1.getRequest<API.Issuing.Programs.Response>('/issuing/config/programs').then(({ data }) => data),
    },
  },
};
