import { apiClientV1, apiClientV1Frontend } from '../utils/apiClientFactory';
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
  // Card money movement (`deposit` / `withdraw`). Both card-level methods are thin wrappers the
  // backend resolves to the card's sub-account, so they share the sub-account order types,
  // validation and program routing. All four require the ADMIN role on the owning wallet — the
  // card's wallet for `cards.*`, the sub-account's wallet for `subAccounts.*`.
  issuing: {
    cards: {
      // `status` is a comma-separated list on the wire (`status=ACTIVE,FROZEN`). The spec types it as
      // an array, which axios would default-serialize to `status[]=ACTIVE&status[]=FROZEN` — a form
      // the endpoint does not parse — so join it here and keep the array in the public type.
      list: ({
        status,
        ...params
      }: API.Frontend.Issuing.Cards.List.Request = {}): Promise<API.Frontend.Issuing.Cards.List.Response> =>
        apiClientV1Frontend.getRequest<API.Frontend.Issuing.Cards.List.Response>('/frontend/issuing/cards', {
          params: status?.length ? { ...params, status: status.join(',') } : params,
        }),
      deposit: ({
        card_id,
        ...data
      }: API.Frontend.Issuing.Cards.Deposit.Request): Promise<API.Frontend.Issuing.Cards.Deposit.Response> =>
        apiClientV1Frontend.postRequest<API.Frontend.Issuing.Cards.Deposit.Response>(
          `/frontend/issuing/cards/${card_id}/deposit`,
          { data },
        ),
      withdraw: ({
        card_id,
        ...data
      }: API.Frontend.Issuing.Cards.Withdraw.Request): Promise<API.Frontend.Issuing.Cards.Withdraw.Response> =>
        apiClientV1Frontend.postRequest<API.Frontend.Issuing.Cards.Withdraw.Response>(
          `/frontend/issuing/cards/${card_id}/withdraw`,
          { data },
        ),
    },
    // Cardholder create flow (see the OpenAPI spec for details):
    //   1. `cardholders.create` — creates a DRAFT; no vendor is contacted. In `user_data_id` mode
    //      the KYC documents are seeded from the verified user, so step 2 is usually unnecessary.
    //   2. `cardholders.documents.upload` (one file per request, before or after the draft exists)
    //      + `cardholders.documents.attach` — attach the returned upload ids to the draft.
    //   3. `cardholders.submit` — registers at the vendor and flips the cardholder to ACTIVE.
    // All write endpoints require the ADMIN role on the wallet; `wallet_id` travels as a query
    // parameter for access validation.
    cardholders: {
      list: (
        params: API.Frontend.Issuing.Cardholders.List.Request = {},
      ): Promise<API.Frontend.Issuing.Cardholders.List.Response> =>
        apiClientV1Frontend.getRequest<API.Frontend.Issuing.Cardholders.List.Response>(
          '/frontend/issuing/cardholders',
          { params },
        ),
      create: (
        data: API.Frontend.Issuing.Cardholders.Create.Request,
      ): Promise<API.Frontend.Issuing.Cardholders.Create.Response> =>
        apiClientV1Frontend.postRequest<API.Frontend.Issuing.Cardholders.Create.Response>(
          '/frontend/issuing/cardholders',
          { data },
        ),
      getById: ({
        cardholder_id,
        ...params
      }: API.Frontend.Issuing.Cardholders.Get.Request): Promise<API.Frontend.Issuing.Cardholders.Get.Response> =>
        apiClientV1Frontend.getRequest<API.Frontend.Issuing.Cardholders.Get.Response>(
          `/frontend/issuing/cardholders/${cardholder_id}`,
          { params },
        ),
      delete: ({
        cardholder_id,
        ...params
      }: API.Frontend.Issuing.Cardholders.Delete.Request): Promise<API.Frontend.Issuing.Cardholders.Delete.Response> =>
        apiClientV1Frontend.deleteRequest(`/frontend/issuing/cardholders/${cardholder_id}`, { params }),
      // Retryable: a failed submit leaves the draft untouched, so it can be called again once the
      // dossier is complete (a `400 CARDHOLDER_SUBMISSION_INCOMPLETE` lists what is missing in
      // `error.details.missing`). While a review is running — or once the cardholder is live —
      // another submit returns `409 CARDHOLDER_NOT_DRAFT`.
      submit: ({
        cardholder_id,
        ...params
      }: API.Frontend.Issuing.Cardholders.Submit.Request): Promise<API.Frontend.Issuing.Cardholders.Submit.Response> =>
        apiClientV1Frontend.postRequest<API.Frontend.Issuing.Cardholders.Submit.Response>(
          `/frontend/issuing/cardholders/${cardholder_id}/submit`,
          { params },
        ),
      documents: {
        // Send the file the camera produced, unchanged (no crop/resize/re-encode — the vendor's
        // tampering check can flag a re-encoded photo as forgery), one file per request so the UI
        // can show per-file progress and retry. Content-Type is set by the browser via FormData.
        upload: ({
          wallet_id,
          ...files
        }: API.Frontend.Issuing.Cardholders.Documents.Upload.Request): Promise<API.Frontend.Issuing.Cardholders.Documents.Upload.Response> => {
          const formData = new FormData();

          Object.entries(files).forEach(([type, file]) => {
            if (file) formData.append(type, file);
          });

          return apiClientV1Frontend.postRequest<API.Frontend.Issuing.Cardholders.Documents.Upload.Response>(
            '/frontend/issuing/cardholder-documents',
            { data: formData, params: { wallet_id } },
          );
        },
        // Only uploads not yet attached to a cardholder can be discarded (attached ones answer 409);
        // an upload that is never attached is deleted by a cleanup sweep anyway.
        discard: ({
          document_id,
          ...params
        }: API.Frontend.Issuing.Cardholders.Documents.Discard.Request): Promise<void> =>
          apiClientV1Frontend.deleteRequest(`/frontend/issuing/cardholder-documents/${document_id}`, { params }),
        // Attaching a document of a type the cardholder already has replaces the previous one.
        attach: ({
          cardholder_id,
          wallet_id,
          ...data
        }: API.Frontend.Issuing.Cardholders.Documents.Attach.Request): Promise<API.Frontend.Issuing.Cardholders.Documents.Attach.Response> =>
          apiClientV1Frontend.postRequest<API.Frontend.Issuing.Cardholders.Documents.Attach.Response>(
            `/frontend/issuing/cardholders/${cardholder_id}/documents`,
            { data, params: { wallet_id } },
          ),
      },
    },
    subAccounts: {
      deposit: ({
        sub_account_id,
        ...data
      }: API.Frontend.Issuing.SubAccounts.Deposit.Request): Promise<API.Frontend.Issuing.SubAccounts.Deposit.Response> =>
        apiClientV1Frontend.postRequest<API.Frontend.Issuing.SubAccounts.Deposit.Response>(
          `/frontend/issuing/sub-accounts/${sub_account_id}/deposit`,
          { data },
        ),
      // Concurrent withdrawals on the same sub-account are rejected with `409`. The currency is
      // taken from the sub-account, so only the amount is needed.
      withdraw: ({
        sub_account_id,
        ...data
      }: API.Frontend.Issuing.SubAccounts.Withdraw.Request): Promise<API.Frontend.Issuing.SubAccounts.Withdraw.Response> =>
        apiClientV1Frontend.postRequest<API.Frontend.Issuing.SubAccounts.Withdraw.Response>(
          `/frontend/issuing/sub-accounts/${sub_account_id}/withdraw`,
          { data },
        ),
    },
  },
};
