import { apiClientV2 } from '../utils/apiClientFactory';
import { API } from './types/types';

export const tenants = {
  config: {
    get: (): Promise<API.Tenant.Config> => apiClientV2.getRequest<API.Tenant.Config>('/system/config'),
  },
};
