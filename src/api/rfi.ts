import { apiClientV1Frontend } from '../utils/apiClientFactory';

import { API } from './types/types';

/**
 * Requests for information from compliance (SFI-2280), scoped by `wallet_id`. The client can only
 * read and answer them: the spec declares no method to close, edit or delete one.
 */
export const rfi = {
  list: ({ wallet_id, ...params }: API.Rfi.List.Request): Promise<API.Rfi.List.Response> =>
    apiClientV1Frontend.getRequest<API.Rfi.List.Response>(`/frontend/rfi/${wallet_id}`, { params }),
  getById: ({ wallet_id, case_id }: API.Rfi.GetById.Request): Promise<API.Rfi.GetById.Response> =>
    apiClientV1Frontend.getRequest<API.Rfi.GetById.Response>(`/frontend/rfi/${wallet_id}/${case_id}`),
  // Each file is its own part named `files` (repeated, not `files[]`) — the form verified live.
  // Content-Type is left to the browser, which adds the multipart boundary. A reply carries up to
  // 10 files of 20 MB, which the client's 60 s default timeout may not cover: pass `timeout`.
  reply: ({
    wallet_id,
    case_id,
    body,
    files,
    signal,
    timeout,
  }: API.Rfi.Reply.Request): Promise<API.Rfi.Reply.Response> => {
    const formData = new FormData();

    if (body) formData.append('body', body);
    files?.forEach((file) => formData.append('files', file));

    return apiClientV1Frontend.postRequest<API.Rfi.Reply.Response>(`/frontend/rfi/${wallet_id}/${case_id}/messages`, {
      data: formData,
      signal,
      timeout,
    });
  },
  // The signed link lives `expires_in` seconds (about 120): open it right away and request a new
  // one for every download instead of storing it.
  getAttachmentLink: ({
    wallet_id,
    case_id,
    attachment_id,
  }: API.Rfi.GetAttachmentLink.Request): Promise<API.Rfi.GetAttachmentLink.Response> =>
    apiClientV1Frontend.getRequest<API.Rfi.GetAttachmentLink.Response>(
      `/frontend/rfi/${wallet_id}/${case_id}/attachments/${attachment_id}`,
    ),
};
