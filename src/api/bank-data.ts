import { apiClientV1Frontend } from '../utils/apiClientFactory';
import { API } from './types/types';

export const bankData = {
  getByCode: (params: API.BankData.GetByCode.Request): Promise<API.BankData.GetByCode.Response> =>
    apiClientV1Frontend.getRequest<API.BankData.GetByCode.Response>('/frontend/bank-data', {
      params,
    }),
};
