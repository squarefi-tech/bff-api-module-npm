import { apiClientV2 } from '../utils/apiClientFactory';
import { API } from './types/types';

export const bankData = {
  getBankDataByAccountNumber: ({
    account_number,
  }: API.BankData.GetBankDataByAccountNumber.Request): Promise<API.BankData.GetBankDataByAccountNumber.Response> =>
    apiClientV2.getRequest<API.BankData.GetBankDataByAccountNumber.Response>(`/bank-data/${account_number}`),
};
