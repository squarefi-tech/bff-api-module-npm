/* eslint-disable import/prefer-default-export */

import { AxiosRequestConfig } from 'axios';

import { API } from './types';

import { apiClientV2 } from '../utils/apiClientFactory';

export const list = {
  currencies: {
    getAll: (params?: AxiosRequestConfig) => apiClientV2.getRequest<API.Currencies.CurrencyList>('/currencies', params),
  },
  chains: {
    getAll: (params?: AxiosRequestConfig) => apiClientV2.getRequest<API.Chains.ChainList>('/chains', params),
  },
};
