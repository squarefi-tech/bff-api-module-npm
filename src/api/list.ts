/* eslint-disable import/prefer-default-export */

import { AxiosRequestConfig } from 'axios';

import { API } from './types/types';

import { apiClientV2 } from '../utils/apiClientFactory';

export const list = {
  currencies: {
    getAll: (params?: AxiosRequestConfig): Promise<API.Currencies.CurrencyList> =>
      apiClientV2.getRequest<API.Currencies.CurrencyList>('/system/currencies', params),
  },
  chains: {
    getAll: (params?: AxiosRequestConfig): Promise<API.Chains.ChainList> =>
      apiClientV2.getRequest<API.Chains.ChainList>('/system/chains', params),
  },
  countries: {
    getAll: (params?: AxiosRequestConfig): Promise<API.Location.Countries.List.Response> =>
      apiClientV2.getRequest<API.Location.Countries.List.Response>('/system/countries', params),
  },
  states: {
    getAll: ({ country_id }: API.Location.States.List.Request): Promise<API.Location.States.List.Response> =>
      apiClientV2.getRequest<API.Location.States.List.Response>(`/system/states/${country_id}`),
  },
};
