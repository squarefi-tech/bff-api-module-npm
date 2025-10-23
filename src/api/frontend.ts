import { create } from 'domain';
import { apiClientV1 } from '../utils/apiClientFactory';
import { API } from './types/types';

export const frontend = {
  access: {
    keys: {
      create: (data: API.Frontend.Access.Keys.Create.Request): Promise<API.Frontend.Access.Keys.Create.Response> =>
        apiClientV1.postRequest<API.Frontend.Access.Keys.Create.Response>('/frontend/access/keys', { data }),
      list: (): Promise<API.Frontend.Access.Keys.List.Response> =>
        apiClientV1.getRequest<API.Frontend.Access.Keys.List.Response>('/frontend/access/keys'),
      regenerate: (key_id: string): Promise<API.Frontend.Access.Keys.Regenerate.Response> =>
        apiClientV1.postRequest<API.Frontend.Access.Keys.Regenerate.Response>(
          `/frontend/access/keys/${key_id}/regenerate`,
        ),
      revoke: (key_id: string): Promise<API.Frontend.Access.Keys.Revoke.Response> =>
        apiClientV1.deleteRequest(`/frontend/access/keys/${key_id}`),
    },
  },
};
