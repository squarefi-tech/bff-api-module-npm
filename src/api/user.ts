import { API } from './types/types';

import { apiClientV2 } from '../utils/apiClientFactory';

export const user = {
  get: () => apiClientV2.getRequest<API.User.User>('/user'),
  userData: {
    get: () => apiClientV2.getRequest<API.User.UserData.UserData>('/user/user-data'),
    update: (data: API.User.UserData.UpdateUserData.Request) =>
      apiClientV2.patchRequest<API.User.UserData.UpdateUserData.Response>('/user/user-data', { data }),
  },
  update: {
    phone: {
      request: (data: API.User.UpdateUser.Phone.RequestOTP.Request) =>
        apiClientV2.patchRequest('/user/phone', { data }),
      confirm: (data: API.User.UpdateUser.Phone.Confirm.Request) => apiClientV2.postRequest('/user/phone', { data }),
    },
    email: {
      request: (data: API.User.UpdateUser.Email.RequestOTP.Request) =>
        apiClientV2.patchRequest('/user/email', { data }),
      confirm: (data: API.User.UpdateUser.Email.Confirm.Request) => apiClientV2.postRequest('/user/email', { data }),
    },
  },
};
