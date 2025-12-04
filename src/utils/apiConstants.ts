/**
 * Общие константы для API клиентов (axios и openapi-fetch)
 */

export const API_V1_BASE_URL = process.env.API_URL ?? 'ENV variable API_URL is not defined';
export const API_V2_BASE_URL = process.env.API_V2_URL ?? 'ENV variable API_V2_URL is not defined';
export const API_TOTP_BASE_URL = process.env.API_TOTP_URL ?? 'ENV variable API_TOTP_URL is not defined';
export const TENANT_ID = process.env.TENANT_ID ?? 'ENV variable TENANT_ID is not defined';
export const LOGOUT_URL = process.env.LOGOUT_URL ?? '/auth/logout';

// Пути для проверки специальных запросов
export const REFRESH_TOKEN_PATH = '/auth/refresh/refresh-token';
export const TELEGRAM_SIGN_IN_PATH = '/auth/sign-in/telegram';
export const TELEGRAM_SIGN_UP_PATH = '/auth/sign-up/telegram';

