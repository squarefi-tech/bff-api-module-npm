import { API } from './types/types';

import { apiClientV2 } from '../utils/apiClientFactory';
import { convertPhoneToSupabaseFormat } from '../utils/converters';

export const telegramSignInPath = '/auth/sign-in/telegram'; // V2 path
// export const telegramSignInPath = '/auth/signin/telegram'; // V1 path

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
          data: { phone: convertPhoneToSupabaseFormat(phone), token, type: 'sms' },
        }),
    },
  },
  signin: {
    omni: {
      email: (data: API.Auth.SignIn.Email.OTP.Request) =>
        apiClientV2.postRequest('/auth/sign-in/omni/email/otp', { data }),
      phone: ({ phone, ...data }: API.Auth.SignIn.Phone.OTP.Request) =>
        apiClientV2.postRequest('/auth/sign-in/omni/phone/otp', {
          data: { phone: convertPhoneToSupabaseFormat(phone), ...data },
        }),
    },
    telegram: (data: API.Auth.Telegram.Signin) =>
      apiClientV2.postRequest<API.Auth.Tokens>(telegramSignInPath, { data }),
    password: (
      email: string,
      password: string // check on backend V2
    ) =>
      apiClientV2.postRequest<API.Auth.Tokens>('/auth/sign-in/password/email', {
        data: { email, password },
      }),
  },
  signup: {
    password: (email: string, password: string) =>
      apiClientV2.postRequest<API.Auth.Tokens>('/auth/sign-up/password/email', {
        data: { email, password },
      }),
    telegram: (data: API.Auth.Telegram.Signup) => apiClientV2.postRequest(telegramSignUpPath, { data }),
  },
  refresh: {
    refresh_token: (refresh_token: string) =>
      apiClientV2.postRequest<API.Auth.Tokens>(refreshTokenPath, { data: { refresh_token } }),
  },
};
