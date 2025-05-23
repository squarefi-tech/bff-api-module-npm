import { apiClientV2 } from '../utils/apiClientFactory';
import { API } from './types/types';

export const persona = {
  inquiries: {
    init: ({ wallet_id, type }: API.Persona.Inquiries.Init.Request): Promise<API.Persona.Inquiries.Init.Response> =>
      apiClientV2.postRequest<API.Persona.Inquiries.Init.Response>(`/persona/inquiries/init/${wallet_id}/${type}`),
  },
};
