import { apiClientV2 } from '../utils/apiClientFactory';
import { API } from './types/types';

export const referrals = {
  levels: {
    getAll: (): Promise<API.Referrals.Levels.Response> =>
      apiClientV2.getRequest<API.Referrals.Levels.Response>('/referrals/levels'),
  },
  income: {
    progress: {
      get: (): Promise<API.Referrals.Income.Progress.Response> =>
        apiClientV2.getRequest<API.Referrals.Income.Progress.Response>('/referrals/income/progress'),
    },
    summary: {
      get: (): Promise<API.Referrals.Income.Summary.Response> =>
        apiClientV2.getRequest<API.Referrals.Income.Summary.Response>('/referrals/income/summary'),
    },
  },
};
