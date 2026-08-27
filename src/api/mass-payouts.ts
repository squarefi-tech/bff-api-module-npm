import { apiClientV1Frontend } from '../utils/apiClientFactory';

import { API } from './types/types';

/**
 * Mass payouts (SFI-1528). Every endpoint is scoped by the source `wallet_id` and requires an
 * administrative role on that wallet. The lifecycle is DRAFT -> (edit/preview) -> submit ->
 * approve; nothing moves until approval, and `templates.*` are reusable recipient lists a draft
 * can be seeded from.
 *
 * `list` / `items` filter by a single status value (not an array), so they need none of the
 * comma-joining the issuing list endpoints do.
 *
 * Two limits live outside this client. The recipient caps are per-tenant and come from
 * `tenants.config.get()` under `mass_payouts` (`API.MassPayouts.Config`) — never hardcode them.
 * The batch a payment belongs to is read off the order (`mass_payout`), and a feed is narrowed to
 * one batch with the `mass_payout_id` order-list filter, not from here.
 */
export const massPayouts = {
  list: ({ wallet_id, ...params }: API.MassPayouts.List.Request): Promise<API.MassPayouts.List.Response> =>
    apiClientV1Frontend.getRequest<API.MassPayouts.List.Response>(`/frontend/mass-payouts/${wallet_id}`, { params }),
  create: ({ wallet_id, ...data }: API.MassPayouts.Create.Request): Promise<API.MassPayouts.Create.Response> =>
    apiClientV1Frontend.postRequest<API.MassPayouts.Create.Response>(`/frontend/mass-payouts/${wallet_id}`, { data }),
  getById: ({ wallet_id, id }: API.MassPayouts.GetById.Request): Promise<API.MassPayouts.GetById.Response> =>
    apiClientV1Frontend.getRequest<API.MassPayouts.GetById.Response>(`/frontend/mass-payouts/${wallet_id}/${id}`),
  // Draft-only. `items` fully replaces the recipient list; `virtual_account_id: null` clears the
  // source virtual account and `scheduled_at: null` drops the schedule.
  update: ({ wallet_id, id, ...data }: API.MassPayouts.Update.Request): Promise<API.MassPayouts.Update.Response> =>
    apiClientV1Frontend.putRequest<API.MassPayouts.Update.Response>(`/frontend/mass-payouts/${wallet_id}/${id}`, {
      data,
    }),
  items: ({ wallet_id, id, ...params }: API.MassPayouts.Items.Request): Promise<API.MassPayouts.Items.Response> =>
    apiClientV1Frontend.getRequest<API.MassPayouts.Items.Response>(`/frontend/mass-payouts/${wallet_id}/${id}/items`, {
      params,
    }),
  preview: ({ wallet_id, id }: API.MassPayouts.Preview.Request): Promise<API.MassPayouts.Preview.Response> =>
    apiClientV1Frontend.getRequest<API.MassPayouts.Preview.Response>(
      `/frontend/mass-payouts/${wallet_id}/${id}/preview`,
    ),
  submit: ({ wallet_id, id }: API.MassPayouts.Submit.Request): Promise<API.MassPayouts.Submit.Response> =>
    apiClientV1Frontend.postRequest<API.MassPayouts.Submit.Response>(
      `/frontend/mass-payouts/${wallet_id}/${id}/submit`,
    ),
  // Second factor is mandatory and per-batch: run the `totp.otp_verification` flow with the batch
  // id as `request_id` and let the user complete it BEFORE calling this, or approve answers 403
  // `VERIFICATION_NOT_APPROVED` (404 `REQUEST_ID_NOT_FOUND` when none was ever requested). The
  // check runs before anything is claimed, so a refusal leaves the batch untouched and approve can
  // simply be retried. Clerk tenants additionally need a step-up verified within the last 10 min.
  approve: ({ wallet_id, id }: API.MassPayouts.Approve.Request): Promise<API.MassPayouts.Approve.Response> =>
    apiClientV1Frontend.postRequest<API.MassPayouts.Approve.Response>(
      `/frontend/mass-payouts/${wallet_id}/${id}/approve`,
    ),
  cancel: ({ wallet_id, id }: API.MassPayouts.Cancel.Request): Promise<API.MassPayouts.Cancel.Response> =>
    apiClientV1Frontend.postRequest<API.MassPayouts.Cancel.Response>(
      `/frontend/mass-payouts/${wallet_id}/${id}/cancel`,
    ),
  // `text/csv`, not the JSON envelope — the raw CSV body is resolved as a string. `responseType`
  // is the repo's mechanism for non-JSON answers (see `statements.pdfByWalletUuid`); this one
  // stays on the axios frontend client rather than the native fetch one because the fetch client
  // has no Bearer variant and no 401-refresh, which every other `/frontend/*` call relies on.
  reportCsv: ({ wallet_id, id }: API.MassPayouts.ReportCsv.Request): Promise<API.MassPayouts.ReportCsv.Response> =>
    apiClientV1Frontend.getRequest<API.MassPayouts.ReportCsv.Response>(
      `/frontend/mass-payouts/${wallet_id}/${id}/report.csv`,
      { responseType: 'text' },
    ),
  templates: {
    list: ({
      wallet_id,
      ...params
    }: API.MassPayouts.Templates.List.Request): Promise<API.MassPayouts.Templates.List.Response> =>
      apiClientV1Frontend.getRequest<API.MassPayouts.Templates.List.Response>(
        `/frontend/mass-payouts/${wallet_id}/templates`,
        { params },
      ),
    create: ({
      wallet_id,
      ...data
    }: API.MassPayouts.Templates.Create.Request): Promise<API.MassPayouts.Templates.Create.Response> =>
      apiClientV1Frontend.postRequest<API.MassPayouts.Templates.Create.Response>(
        `/frontend/mass-payouts/${wallet_id}/templates`,
        { data },
      ),
    getById: ({
      wallet_id,
      template_id,
    }: API.MassPayouts.Templates.GetById.Request): Promise<API.MassPayouts.Templates.GetById.Response> =>
      apiClientV1Frontend.getRequest<API.MassPayouts.Templates.GetById.Response>(
        `/frontend/mass-payouts/${wallet_id}/templates/${template_id}`,
      ),
    // `items` fully replaces the row list; `virtual_account_id: null` clears the source account.
    update: ({
      wallet_id,
      template_id,
      ...data
    }: API.MassPayouts.Templates.Update.Request): Promise<API.MassPayouts.Templates.Update.Response> =>
      apiClientV1Frontend.putRequest<API.MassPayouts.Templates.Update.Response>(
        `/frontend/mass-payouts/${wallet_id}/templates/${template_id}`,
        { data },
      ),
    delete: ({
      wallet_id,
      template_id,
    }: API.MassPayouts.Templates.Delete.Request): Promise<API.MassPayouts.Templates.Delete.Response> =>
      apiClientV1Frontend.deleteRequest(`/frontend/mass-payouts/${wallet_id}/templates/${template_id}`),
  },
};
