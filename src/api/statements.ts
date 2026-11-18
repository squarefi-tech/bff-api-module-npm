import { API } from './types/types';

import { apiClientV1Native } from '../utils/apiClientFactory';

export const statements = {
  /**
   * @deprecated Calls the legacy public `GET /wallets/transactions/{wallet_uuid}/statement-pdf`, which CORE is
   * removing. Use `wallets.statementPdf` (`GET /frontend/wallets/{wallet_id}/statement-pdf`, `currency_uuid`
   * instead of `crypto_id`).
   */
  pdfByWalletUuid: ({
    wallet_uuid,
    ...params
  }: API.Statements.Pdf.Request): Promise<API.Statements.Pdf.Response> =>
    apiClientV1Native.getRequest<API.Statements.Pdf.Response>(
      `/wallets/transactions/${wallet_uuid}/statement-pdf`,
      { params, responseType: 'blob' },
    ),
};
