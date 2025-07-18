import { API } from './types/types';

import { apiClientV2 } from '../utils/apiClientFactory';

export const user = {
  get: (): Promise<API.User.Get.Response> => apiClientV2.getRequest<API.User.Get.Response>('/user'),
  userData: {
    get: (): Promise<API.User.UserData.Get.Response> =>
      apiClientV2.getRequest<API.User.UserData.Get.Response>('/user/user-data'),
    update: (data: API.User.UserData.Update.Request): Promise<API.User.UserData.Update.Response> =>
      apiClientV2.patchRequest<API.User.UserData.Update.Response>('/user/user-data', { data }),
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
