import { apiClientV1 } from '../utils/apiClientFactory';
import { API } from './types/types';

export const virtualAccounts = {
  create: (data: API.VirtualAccounts.Create.Request) =>
    apiClientV1.postRequest<API.VirtualAccounts.Create.Response>('/virtual_account', { data }),
  getAll: ({ wallet_uuid, ...params }: API.VirtualAccounts.GetAll.Request) =>
    apiClientV1.getRequest<API.VirtualAccounts.GetAll.Response>(`/virtual_account/list/${wallet_uuid}`, { params }),
  getByUuid: ({ uuid }: API.VirtualAccounts.GetByUuid.Request) =>
    apiClientV1.getRequest<API.VirtualAccounts.GetByUuid.Response>(`/virtual_account/${uuid}`),
  programs: {
    list: (params: API.VirtualAccounts.Programs.List.Request) =>
      apiClientV1.getRequest<API.VirtualAccounts.Programs.List.Response>('/virtual_account/programs/list', { params }),
  },
};
