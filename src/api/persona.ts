import { apiClientV2 } from '../utils/apiClientFactory';
import { API } from './types/types';

export const persona = {
  inquiries: {
    /** @deprecated Use squarefi_bff_api_client.kyc.dataCollection.init instead. */
    init: ({ wallet_id, type }: API.Persona.Inquiries.Init.Request): Promise<API.KYC.DataCollection.Init.Response> =>
      apiClientV2.postRequest<API.KYC.DataCollection.Init.Response>(`/kyc/init/${wallet_id}/${type}`),
    /** @deprecated Use squarefi_bff_api_client.kyc.dataCollection.resume instead. */
    resume: ({
      wallet_id,
      inquiry_id,
    }: API.Persona.Inquiries.Resume.Request): Promise<API.KYC.DataCollection.Resume.Response> =>
      apiClientV2.postRequest<API.KYC.DataCollection.Resume.Response>(
        `/kyc/resume/${wallet_id}/${inquiry_id}`,
      ),
  },
};
