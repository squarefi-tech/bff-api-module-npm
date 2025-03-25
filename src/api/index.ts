import { createApiClient } from '../utils/apiClientFactory';

const apiV1BaseURL = process.env.API_URL ?? 'ENV variable API_URL is not defined';
const apiV2BaseURL = process.env.API_V2_URL ?? 'ENV variable API_V2_URL is not defined';
const envTenantId = process.env.TENANT_ID ?? 'ENV variable TENANT_ID is not defined';

export const apiClientV1 = createApiClient({
  baseURL: apiV1BaseURL,
  tenantId: envTenantId,
});

export const apiClientV2 = createApiClient({
  baseURL: apiV2BaseURL,
  isBearerToken: true,
  tenantId: envTenantId,
});
