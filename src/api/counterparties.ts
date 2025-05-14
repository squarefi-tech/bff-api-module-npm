import { apiClientV2 } from '../utils/apiClientFactory';
import { API } from './types/types';

export const counterparties = {
  getAll: ({ wallet_id, ...params }: API.Counterparties.List.Request) =>
    apiClientV2.getRequest<API.Counterparties.List.Response>(`/counterparties/${wallet_id}`, {
      params,
    }),
  getById: ({ wallet_id, counterparty_account_id }: API.Counterparties.GetById.Request) =>
    apiClientV2.getRequest<API.Counterparties.GetById.Response>(
      `/counterparties/${wallet_id}/${counterparty_account_id}`
    ),
  create: ({ wallet_id, ...data }: API.Counterparties.Create.Request) =>
    apiClientV2.postRequest<API.Counterparties.Create.Response>(`/counterparties/${wallet_id}`, { data }),
  update: ({ wallet_id, counterparty_account_id, ...data }: API.Counterparties.Update.Request) =>
    apiClientV2.patchRequest<API.Counterparties.Update.Response>(
      `/counterparties/${wallet_id}/${counterparty_account_id}`,
      { data }
    ),
  destinations: {
    getAll: ({ wallet_id, counterparty_account_id, ...params }: API.Counterparties.Destination.List.Request) =>
      apiClientV2.getRequest<API.Counterparties.Destination.List.Response>(
        `/counterparties/${wallet_id}/${counterparty_account_id}/destinations`,
        { params }
      ),
    getById: ({
      wallet_id,
      counterparty_account_id,
      counterparty_destination_id,
    }: API.Counterparties.Destination.Detail.Request) =>
      apiClientV2.getRequest<API.Counterparties.Destination.Detail.Response>(
        `/counterparties/${wallet_id}/${counterparty_account_id}/destinations/${counterparty_destination_id}`
      ),
    create: ({ wallet_id, counterparty_account_id, ...data }: API.Counterparties.Destination.Create.Request) =>
      apiClientV2.postRequest<API.Counterparties.Destination.Create.Response>(
        `/counterparties/${wallet_id}/${counterparty_account_id}/destinations`,
        { data }
      ),
    update: ({
      wallet_id,
      counterparty_account_id,
      counterparty_destination_id,
      ...data
    }: API.Counterparties.Destination.Update.Request) =>
      apiClientV2.patchRequest<API.Counterparties.Destination.Update.Response>(
        `/counterparties/${wallet_id}/${counterparty_account_id}/destinations/${counterparty_destination_id}`,
        { data }
      ),
    delete: ({
      wallet_id,
      counterparty_account_id,
      counterparty_destination_id,
    }: API.Counterparties.Destination.Delete.Request) =>
      apiClientV2.deleteRequest(
        `/counterparties/${wallet_id}/${counterparty_account_id}/destinations/${counterparty_destination_id}`
      ),
  },
};
