import { API } from './types';

import { apiClientV2 } from '../utils/apiClientFactory';

export const telegramSignInPath = '/auth/sign-in/telegram';
export const telegramSignUpPath = '/auth/sign-up/telegram';
export const refreshTokenPath = '/auth/refresh/refresh-token';

export const auth = {
  otp: {
    verify: {
      email: (email: string, token: string) =>
        apiClientV2.postRequest<API.Auth.VerifyOtp.Response>('/auth/verify/email/otp', {
          data: { email, token, type: 'email' },
        }),
      phone: (phone: string, token: string) =>
        apiClientV2.postRequest<API.Auth.VerifyOtp.Response>('/auth/verify/phone/otp', {
          data: { phone, token, type: 'sms' },
        }),
    },
  },
  signin: {
    omni: {
      email: (data: API.Auth.SignIn.Email.OTP.Request) =>
        apiClientV2.postRequest('/auth/sign-in/omni/email/otp', { data }),
      phone: (data: API.Auth.SignIn.Phone.OTP.Request) =>
        apiClientV2.postRequest('/auth/sign-in/omni/phone/otp', { data }),
    },
    telegram: (data: API.Auth.Telegram.Signin) =>
      apiClientV2.postRequest<API.Auth.Tokens>(telegramSignInPath, { data }),
    password: (
      email: string,
      password: string // check on backend V2
    ) =>
      apiClientV2.postRequest<API.Auth.SupabaseGetSessionResponse>('/auth/sign-in/password', {
        data: { email, password },
      }),
  },
  signup: {
    password: (email: string, password: string) =>
      apiClientV2.postRequest<API.Auth.SupabaseGetSessionResponse>('/auth/sign-up/password', {
        data: { email, password },
      }),
    telegram: (data: API.Auth.Telegram.Signup) => apiClientV2.postRequest(telegramSignUpPath, { data }),
  },
  refresh: {
    refresh_token: (refresh_token: string) =>
      apiClientV2.postRequest<API.Auth.Tokens>(refreshTokenPath, { data: { refresh_token } }),
  },
};
