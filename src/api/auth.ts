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
          context: { bypassUnauthorizedHandler: true },
        }),
      phone: (phone: string, token: string): Promise<API.Auth.VerifyOtp.Response> =>
        apiClientV2.postRequest<API.Auth.VerifyOtp.Response>('/auth/verify/phone/otp', {
          data: {
            phone: convertPhoneToSupabaseFormat(phone),
            token,
            type: 'sms',
          },
          context: { bypassUnauthorizedHandler: true },
        }),
    },
  },
  signin: {
    omni: {
      email: (data: API.Auth.SignIn.Omni.Email.OTP.Request): Promise<API.Auth.Tokens> =>
        apiClientV2.postRequest('/auth/sign-in/omni/email/otp', {
          data,
          context: { bypassUnauthorizedHandler: true },
        }),
      phone: ({ phone, ...data }: API.Auth.SignIn.Omni.Phone.OTP.Request): Promise<API.Auth.Tokens> =>
        apiClientV2.postRequest('/auth/sign-in/omni/phone/otp', {
          data: { phone: convertPhoneToSupabaseFormat(phone), ...data },
          context: { bypassUnauthorizedHandler: true },
        }),
    },
    byType: (data: API.Auth.SignIn.ByType.Request): Promise<API.Auth.Tokens> =>
      apiClientV2.postRequest('/auth/sign-in', {
        data,
        context: { bypassUnauthorizedHandler: true },
      }),
    telegram: (data: API.Auth.Telegram.Signin.Request): Promise<API.Auth.Telegram.Signin.Response> =>
      apiClientV2.postRequest<API.Auth.Telegram.Signin.Response>(telegramSignInPath, { data }),
    password: (
      email: string,
      password: string, // check on backend V2
    ): Promise<API.Auth.Tokens> =>
      apiClientV2.postRequest<API.Auth.Tokens>('/auth/sign-in/password/email', {
        data: { email, password },
        context: { bypassUnauthorizedHandler: true },
      }),
  },
  signup: {
    byType: (data: API.Auth.SignUp.ByType.Request): Promise<API.Auth.Tokens> =>
      apiClientV2.postRequest('/auth/sign-up', {
        data,
        context: { bypassUnauthorizedHandler: true },
      }),
    password: (email: string, password: string): Promise<API.Auth.Tokens> =>
      apiClientV2.postRequest<API.Auth.Tokens>('/auth/sign-up/password/email', {
        data: { email, password },
        context: { bypassUnauthorizedHandler: true },
      }),
    telegram: (data: API.Auth.Telegram.Signup.Request): Promise<API.Auth.Telegram.Signup.Response> =>
      apiClientV2.postRequest<API.Auth.Telegram.Signup.Response>(telegramSignUpPath, { data }),
  },
  refresh: {
    refresh_token: (data: API.Auth.RefreshToken.Request): Promise<API.Auth.RefreshToken.Response> =>
      apiClientV2.postRequest<API.Auth.RefreshToken.Response>(refreshTokenPath, { data }),
  },
};
