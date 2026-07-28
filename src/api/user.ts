import { API } from './types/types';

import { apiClientV2 } from '../utils/apiClientFactory';

// Options for reading user-data. `bypassUnauthorizedHandler` skips the client's 401 recovery
// (token force-refresh, retry, and sign-out) for this request, so a 401 rejects to the caller
// instead. Used to probe whether the backend user_data record exists yet: on a freshly
// authenticated account the record is missing and returns 401, which must trigger provisioning
// (`POST /auth/register`) rather than signing the user out.
export interface GetUserDataOptions {
  bypassUnauthorizedHandler?: boolean;
}

export const user = {
  userData: {
    get: (options?: GetUserDataOptions): Promise<API.User.UserData.Get.Response> =>
      apiClientV2.getRequest<API.User.UserData.Get.Response>(
        '/user/user-data',
        options?.bypassUnauthorizedHandler ? { context: { bypassUnauthorizedHandler: true } } : undefined,
      ),
    update: (data: API.User.UserData.Update.Request): Promise<API.User.UserData.Update.Response> =>
      apiClientV2.patchRequest<API.User.UserData.Update.Response>('/user/user-data', { data }),
  },
  verification: {
    // Starts (or moves up) the per-user Sumsub level for the requested step and returns the WebSDK
    // credentials. Resolves 404 when the tenant has no level configured for the step. Step results
    // land on user-data (`identity_verification_status` / `face_verification_status`), so poll
    // `user.userData.get()` after the WebSDK reports completion.
    init: (data: API.User.Verification.Init.Request): Promise<API.User.Verification.Init.Response> =>
      apiClientV2.postRequest<API.User.Verification.Init.Response>('/user/verification/init', { data }),
    // Re-issues the WebSDK access token for the level the user is already on; 404 when the user has
    // never been initialized.
    resume: (): Promise<API.User.Verification.Resume.Response> =>
      apiClientV2.postRequest<API.User.Verification.Resume.Response>('/user/verification/resume'),
  },
  update: {
    phone: {
      request: (data: API.User.UpdateUser.Phone.RequestOTP.Request): Promise<void> =>
        apiClientV2.patchRequest('/user/phone', { data }),
      confirm: (data: API.User.UpdateUser.Phone.Confirm.Request): Promise<void> =>
        apiClientV2.postRequest('/user/phone', { data }),
    },
    email: {
      request: (data: API.User.UpdateUser.Email.RequestOTP.Request): Promise<void> =>
        apiClientV2.patchRequest('/user/email', { data }),
      confirm: (data: API.User.UpdateUser.Email.Confirm.Request): Promise<void> =>
        apiClientV2.postRequest('/user/email', { data }),
    },
  },
};
