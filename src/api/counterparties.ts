import { apiClientV1Frontend } from '../utils/apiClientFactory';

import { components as componentsV1Frontend } from './types/autogen/apiV1Frontend.types';
import { API } from './types/types';

type FrontendAccount = componentsV1Frontend['schemas']['CounterpartyAccount'];
type FrontendAccountWithDestinations = componentsV1Frontend['schemas']['CounterpartyAccountWithDestinations'];
type FrontendDestination = componentsV1Frontend['schemas']['CounterpartyDestination'];

type DestinationListItem = API.Counterparties.Destination.List.CounterpartyDestinationListItem;

// Все эндпоинты фронт-модуля заворачивают полезную нагрузку в { success, data, pagination? }.
type Envelope<T> = {
  success: boolean;
  data: T;
  pagination?: componentsV1Frontend['schemas']['PaginationResponse'];
};

// Бэкенд отдаёт реквизиты под ключами banking_data / crypto_data / internal_data; ровно одно
// заполнено и определяется полем type (а не наличием payload — см. описание схемы). Downstream
// исторически читает external_banking_data / external_crypto_data — сохраняем эти имена, INTERNAL
// проносим как есть (нового слота "external" для него нет). Дискриминируем строго по type.
const mapDestination = (destination: FrontendDestination): DestinationListItem => {
  const common = {
    id: destination.id,
    nickname: destination.nickname ?? null,
    type: destination.type,
    created_at: destination.created_at,
  };

  if (destination.type === 'CRYPTO_EXTERNAL' || destination.type === 'CRYPTO_INTERNAL') {
    return { ...common, external_crypto_data: destination.crypto_data } as DestinationListItem;
  }

  if (destination.type === 'INTERNAL') {
    return { ...common, internal_data: destination.internal_data } as DestinationListItem;
  }

  return { ...common, external_banking_data: destination.banking_data } as DestinationListItem;
};

export const counterparties = {
  getAll: async ({
    wallet_id,
    ...params
  }: API.Counterparties.List.Request): Promise<API.Counterparties.List.Response> => {
    const res = await apiClientV1Frontend.getRequest<Envelope<FrontendAccount[]>>(
      `/frontend/counterparty/accounts/wallet/${wallet_id}`,
      { params },
    );

    return { total: res.pagination?.total ?? res.data.length, data: res.data };
  },
  getById: async ({
    counterparty_account_id,
  }: API.Counterparties.GetById.Request): Promise<API.Counterparties.GetById.Response> => {
    const res = await apiClientV1Frontend.getRequest<Envelope<{ account: FrontendAccountWithDestinations }>>(
      `/frontend/counterparty/accounts/${counterparty_account_id}`,
    );
    const { destinations, ...account } = res.data.account;

    return { ...account, destinations: destinations.map(mapDestination) };
  },
  create: async ({
    wallet_id,
    ...data
  }: API.Counterparties.Create.Request): Promise<API.Counterparties.Create.Response> => {
    const res = await apiClientV1Frontend.postRequest<Envelope<{ account: FrontendAccount; message: string }>>(
      `/frontend/counterparty/accounts/wallet/${wallet_id}`,
      { data },
    );

    return res.data.account;
  },
  update: async ({
    counterparty_account_id,
    wallet_id: _wallet_id,
    ...data
  }: API.Counterparties.Update.Request): Promise<API.Counterparties.Update.Response> => {
    const res = await apiClientV1Frontend.patchRequest<Envelope<{ account: FrontendAccount }>>(
      `/frontend/counterparty/accounts/${counterparty_account_id}`,
      { data },
    );

    return res.data.account;
  },
  delete: async ({
    counterparty_account_id,
  }: API.Counterparties.Delete.Request): Promise<API.Counterparties.Delete.Response> => {
    const res = (await apiClientV1Frontend.deleteRequest(
      `/frontend/counterparty/accounts/${counterparty_account_id}`,
    )) as Envelope<{ message: string }>;

    return res.data;
  },
  destinations: {
    getAll: async ({
      wallet_id,
      ...params
    }: API.Counterparties.Destination.List.Request): Promise<API.Counterparties.Destination.List.Response> => {
      const res = await apiClientV1Frontend.getRequest<Envelope<FrontendDestination[]>>(
        `/frontend/counterparty/destinations/wallet/${wallet_id}`,
        { params },
      );

      return { total: res.pagination?.total ?? res.data.length, data: res.data.map(mapDestination) };
    },
    getById: async ({
      counterparty_destination_id,
    }: API.Counterparties.Destination.Detail.Request): Promise<API.Counterparties.Destination.Detail.Response> => {
      const res = await apiClientV1Frontend.getRequest<Envelope<{ destination: FrontendDestination }>>(
        `/frontend/counterparty/destinations/${counterparty_destination_id}`,
      );

      return mapDestination(res.data.destination);
    },
    create: async ({
      wallet_id: _wallet_id,
      external_banking_data,
      external_crypto_data,
      internal_data,
      ...rest
    }: API.Counterparties.Destination.Create.Request): Promise<API.Counterparties.Destination.Create.Response> => {
      const data = {
        ...rest,
        ...(external_banking_data ? { banking_data: external_banking_data } : {}),
        ...(external_crypto_data ? { crypto_data: external_crypto_data } : {}),
        ...(internal_data ? { internal_data } : {}),
      };
      const res = await apiClientV1Frontend.postRequest<
        Envelope<{ destination: FrontendDestination; message: string }>
      >(`/frontend/counterparty/destinations`, { data });

      return mapDestination(res.data.destination);
    },
    update: async ({
      counterparty_destination_id,
      wallet_id: _wallet_id,
      counterparty_account_id: _counterparty_account_id,
      ...data
    }: API.Counterparties.Destination.Update.Request): Promise<API.Counterparties.Destination.Update.Response> => {
      const res = await apiClientV1Frontend.patchRequest<Envelope<{ destination: FrontendDestination }>>(
        `/frontend/counterparty/destinations/${counterparty_destination_id}`,
        { data },
      );

      return mapDestination(res.data.destination);
    },
    delete: async ({
      counterparty_destination_id,
      request_id,
    }: API.Counterparties.Destination.Delete.Request): Promise<void> => {
      await apiClientV1Frontend.deleteRequest(`/frontend/counterparty/destinations/${counterparty_destination_id}`, {
        params: { request_id },
      });
    },
    internalTransfer: async ({
      counterparty_destination_id,
    }: API.Counterparties.Destination.InternalTransfer.Request): Promise<API.Counterparties.Destination.InternalTransfer.Response> => {
      const res = await apiClientV1Frontend.getRequest<
        Envelope<API.Counterparties.Destination.InternalTransfer.Response>
      >(`/frontend/counterparty/destinations/${counterparty_destination_id}/internal-transfer`);

      return res.data;
    },
  },
};
