import { apiClientV2 } from '../utils/apiClientFactory';

export const tenants = {
  config: {
    get: () => apiClientV2.getRequest('/system/config'),
  },
};
