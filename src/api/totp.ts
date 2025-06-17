import { apiClientTOTP } from '../utils/apiClientFactory';
import { API } from './types/types';

export const totp = {
  otp_verification: {
    create: (data: API.TOTP.OTPVerification.Create.Request): Promise<API.TOTP.OTPVerification.Create.Response> => {
      return apiClientTOTP.postRequest<API.TOTP.OTPVerification.Create.Response>('/api/otp-verification/create', {
        data,
      });
    },
    request: (
      data: API.TOTP.OTPVerification.RequestOtp.Request
    ): Promise<API.TOTP.OTPVerification.RequestOtp.Response> => {
      return apiClientTOTP.postRequest<API.TOTP.OTPVerification.RequestOtp.Response>('/api/otp-verification/request', {
        data,
      });
    },
    verify: (data: API.TOTP.OTPVerification.Verify.Request): Promise<API.TOTP.OTPVerification.Verify.Response> => {
      return apiClientTOTP.postRequest<API.TOTP.OTPVerification.Verify.Response>('/api/otp-verification/verify', {
        data,
      });
    },
    get: (id: string): Promise<API.TOTP.OTPVerification.OTPVerificationInfo> => {
      return apiClientTOTP.getRequest<API.TOTP.OTPVerification.OTPVerificationInfo>(`/api/otp-verification/${id}`);
    },
  },
  totp: {
    generate: (data: API.TOTP.TOTP.Generate.Request): Promise<API.TOTP.TOTP.Generate.Response> => {
      return apiClientTOTP.postRequest<API.TOTP.TOTP.Generate.Response>('/api/totp/generate', { data });
    },
    verify: (data: API.TOTP.TOTP.Verify.Request): Promise<API.TOTP.TOTP.Verify.Response> => {
      return apiClientTOTP.postRequest<API.TOTP.TOTP.Verify.Response>('/api/totp/verify', { data });
    },
    revoke: (data: API.TOTP.TOTP.Revoke.Request): Promise<API.TOTP.TOTP.Revoke.Response> => {
      return apiClientTOTP.postRequest<API.TOTP.TOTP.Revoke.Response>('/api/totp/revoke', { data });
    },
    activate: (data: API.TOTP.TOTP.Activate.Request): Promise<API.TOTP.TOTP.Activate.Response> => {
      return apiClientTOTP.postRequest<API.TOTP.TOTP.Activate.Response>('/api/totp/activate', { data });
    },
    generateEncrypted: (
      data: API.TOTP.TOTP.GenerateEncrypted.Request
    ): Promise<API.TOTP.TOTP.GenerateEncrypted.Response> => {
      return apiClientTOTP.postRequest<API.TOTP.TOTP.GenerateEncrypted.Response>('/api/totp/generate-encrypted', {
        data,
      });
    },
  },
};
