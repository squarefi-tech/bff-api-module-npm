import { apiClientV2 } from '../utils/apiClientFactory';
import { API } from './types/types';

export const storage = {
  kyc: {
    upload: (file: File): Promise<API.Storage.KYC.Upload.Response> => {
      const formData = new FormData();
      formData.append('file', file);

      return apiClientV2.postRequest<API.Storage.KYC.Upload.Response>('/storage/kyc', {
        data: formData,
      });
    },
    getFileUrl: ({ path }: API.Storage.KYC.GetFileUrl.Request): Promise<API.Storage.KYC.GetFileUrl.Response> =>
      apiClientV2.getRequest<API.Storage.KYC.GetFileUrl.Response>('/storage/kyc', {
        params: { path },
      }),
    getFileById: ({
      folderId,
      fileId,
    }: API.Storage.KYC.GetFileById.Request): Promise<API.Storage.KYC.GetFileById.Response> =>
      apiClientV2.getRequest<API.Storage.KYC.GetFileById.Response>(`/storage/kyc/${folderId}/${fileId}`),
  },
};
