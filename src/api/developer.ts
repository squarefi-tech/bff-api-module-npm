import { API } from './types';

import { apiClientV1 } from '.';

export const developer = {
  apiKeys: {
    getAll: () => apiClientV1.getRequest<API.Developer.ApiCode.ApiCode[]>('/developer/access/list'),
    create: (data: API.Developer.ApiCode.Create.Request) =>
      apiClientV1.postRequest<API.Developer.ApiCode.Create.Response>('/developer/access/create', { data }),
    rotate: (data: API.Developer.ApiCode.Rotate.Request) =>
      apiClientV1.postRequest<API.Developer.ApiCode.Rotate.Response>(`/developer/access/rotate`, { data }),
    update: (data: API.Developer.ApiCode.Update.Request) =>
      apiClientV1.postRequest(`/developer/access/update`, { data }),
  },
  vendors: {
    list: () => apiClientV1.getRequest<API.Developer.Vendors.Vendor[]>('/developer/vendors/list'),
  },
};
