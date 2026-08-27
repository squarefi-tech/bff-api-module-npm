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
  /**
   * Supporting documents for orders and mass payouts. Separate bucket from KYC. Upload the file
   * first, then pass the returned path as `documents[].url` on the order or the mass payout row —
   * the payout schemas carry the link only, never the bytes. PDF/JPEG/PNG, up to 20 MB.
   */
  orderDocuments: {
    upload: (file: File): Promise<API.Storage.OrderDocuments.Upload.Response> => {
      const formData = new FormData();
      formData.append('file', file);

      return apiClientV2.postRequest<API.Storage.OrderDocuments.Upload.Response>('/storage/order-documents', {
        data: formData,
      });
    },
    getFileById: ({
      folderId,
      fileId,
    }: API.Storage.OrderDocuments.GetFileById.Request): Promise<API.Storage.OrderDocuments.GetFileById.Response> =>
      apiClientV2.getRequest<API.Storage.OrderDocuments.GetFileById.Response>(
        `/storage/order-documents/${folderId}/${fileId}`,
      ),
  },
};
