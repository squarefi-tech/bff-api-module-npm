import { API } from './types/types';

import { apiClientV1 } from '../utils/apiClientFactory';

export const developer = {
  apiKeys: {
    getAll: (): Promise<API.Developer.ApiCode.ApiCode[]> =>
      apiClientV1.getRequest<API.Developer.ApiCode.ApiCode[]>('/developer/access/list'),
    create: (data: API.Developer.ApiCode.Create.Request): Promise<API.Developer.ApiCode.Create.Response> =>
      apiClientV1.postRequest<API.Developer.ApiCode.Create.Response>('/developer/access/create', { data }),
    rotate: (data: API.Developer.ApiCode.Rotate.Request): Promise<API.Developer.ApiCode.Rotate.Response> =>
      apiClientV1.postRequest<API.Developer.ApiCode.Rotate.Response>(`/developer/access/rotate`, { data }),
    update: (data: API.Developer.ApiCode.Update.Request): Promise<void> =>
      apiClientV1.postRequest(`/developer/access/update`, { data }),
  },
  vendors: {
    list: (): Promise<API.Developer.Vendors.Vendor[]> =>
      apiClientV1.getRequest<API.Developer.Vendors.Vendor[]>('/developer/vendors/list'),
  },
};
