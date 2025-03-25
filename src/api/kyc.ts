import { API } from './types';

import { apiClientV1 } from '.';

export const kyc = {
  sumsub: {
    generate_token: (data: API.KYC.Sumsub.GenerateToken.Request) =>
      apiClientV1.postRequest<API.KYC.Sumsub.GenerateToken.Response>('/kyc/sumsub/generate_token', { data }),
  },
};
