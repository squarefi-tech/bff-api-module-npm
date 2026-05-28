import { API } from './types/types';

import { apiClientV1Native } from '../utils/apiClientFactory';

export const statements = {
  pdfByWalletUuid: ({
    wallet_uuid,
    ...params
  }: API.Statements.Pdf.Request): Promise<API.Statements.Pdf.Response> =>
    apiClientV1Native.getRequest<API.Statements.Pdf.Response>(
      `/wallets/transactions/${wallet_uuid}/statement-pdf`,
      { params, responseType: 'blob' },
    ),
};
