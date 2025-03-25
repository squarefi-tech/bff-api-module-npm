/* eslint-disable import/prefer-default-export */

import { AxiosRequestConfig } from 'axios';

import { API } from './types';

import { apiClientV2 } from '.';

export const list = {
  currencies: {
    getAll: (params?: AxiosRequestConfig) =>
      apiClientV2.getRequest<API.Currencies.CurrencyList>('/currencies', params).then(({ data }) => data),
  },
  chains: {
    getAll: (params?: AxiosRequestConfig) =>
      apiClientV2.getRequest<API.Chains.ChainList>('/chains', params).then(({ data }) => data),
  },
};
