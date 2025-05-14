import { apiClientV2 } from '../utils/apiClientFactory';
import { API } from './types/types';

export const persona = {
  inquiries: {
    init: ({ wallet_id, type }: API.Persona.Inquiries.Init.Request) =>
      apiClientV2.getRequest<API.Persona.Inquiries.Init.Response>(`/persona/inquiries/${wallet_id}/${type}`),
  },
};
