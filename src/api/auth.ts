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
      email: (email: string, token: string): Promise<API.Auth.VerifyOtp.Response> =>
        apiClientV2.postRequest<API.Auth.VerifyOtp.Response>('/auth/verify/email/otp', {
          data: { email, token, type: 'email' },
        }),
      phone: (phone: string, token: string): Promise<API.Auth.VerifyOtp.Response> =>
        apiClientV2.postRequest<API.Auth.VerifyOtp.Response>('/auth/verify/phone/otp', {
          data: { phone: convertPhoneToSupabaseFormat(phone), token, type: 'sms' },
        }),
    },
  },
  signin: {
    omni: {
      email: (data: API.Auth.SignIn.Email.OTP.Request): Promise<API.Auth.Tokens> =>
        apiClientV2.postRequest<API.Auth.Tokens>('/auth/sign-in/omni/email/otp', { data }),
      phone: ({ phone, ...data }: API.Auth.SignIn.Phone.OTP.Request): Promise<API.Auth.Tokens> =>
        apiClientV2.postRequest<API.Auth.Tokens>('/auth/sign-in/omni/phone/otp', {
          data: { phone: convertPhoneToSupabaseFormat(phone), ...data },
        }),
    },
    telegram: (data: API.Auth.Telegram.Signin): Promise<API.Auth.Tokens> =>
      apiClientV2.postRequest<API.Auth.Tokens>(telegramSignInPath, { data }),
    password: (
      email: string,
      password: string // check on backend V2
    ): Promise<API.Auth.Tokens> =>
      apiClientV2.postRequest<API.Auth.Tokens>('/auth/sign-in/password/email', {
        data: { email, password },
      }),
  },
  signup: {
    password: (email: string, password: string): Promise<API.Auth.Tokens> =>
      apiClientV2.postRequest<API.Auth.Tokens>('/auth/sign-up/password/email', {
        data: { email, password },
      }),
    telegram: (data: API.Auth.Telegram.Signup): Promise<API.Auth.Tokens> =>
      apiClientV2.postRequest<API.Auth.Tokens>(telegramSignUpPath, { data }),
  },
  refresh: {
    refresh_token: (refresh_token: string): Promise<API.Auth.Tokens> =>
      apiClientV2.postRequest<API.Auth.Tokens>(refreshTokenPath, { data: { refresh_token } }),
  },
};
