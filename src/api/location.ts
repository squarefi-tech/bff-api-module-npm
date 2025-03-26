import { apiClientV2 } from '../utils/apiClientFactory';
import { API } from './types';

export const location = {
  countries: {
    list: () => apiClientV2.getRequest<API.Location.Countries.List.Response>('/location/countries'),
  },
};
