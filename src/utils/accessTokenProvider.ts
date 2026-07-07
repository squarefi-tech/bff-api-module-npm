import { getFromLocalStorage } from './storage';

export type ResolveTokenOptions = {
  /** Force the provider to mint a fresh token, bypassing any cache (used on 401 retry). */
  forceRefresh?: boolean;
};

export type AccessTokenProvider = (options?: ResolveTokenOptions) => Promise<string | null | undefined>;

export type UnauthorizedHandler = () => void;

export type TwoFactorRequiredHandler = () => void;

let accessTokenProvider: AccessTokenProvider | null = null;
let unauthorizedHandler: UnauthorizedHandler | null = null;
let twoFactorRequiredHandler: TwoFactorRequiredHandler | null = null;
let inFlightRefresh: Promise<string | null> | null = null;

/**
 * Register an external source of the access token (e.g. Clerk `getToken`).
 * When set, the API clients stop reading tokens from localStorage and delegate
 * token acquisition (and refresh) to the provider. Pass `null` to fall back to
 * the legacy localStorage flow.
 */
export const setAccessTokenProvider = (provider: AccessTokenProvider | null) => {
  accessTokenProvider = provider;
};

/**
 * Register a callback invoked when a request is unauthorized and cannot be
 * recovered by refreshing the token (e.g. to trigger a Clerk sign-out).
 */
export const setOnUnauthorized = (handler: UnauthorizedHandler | null) => {
  unauthorizedHandler = handler;
};

/**
 * Register a callback invoked when the backend rejects a request because
 * two-factor authentication is required but not yet satisfied (HTTP 403 with a
 * `two_factor_required` error code). The consumer typically redirects the user
 * to the 2FA setup flow. Pass `null` to unregister.
 */
export const setOnTwoFactorRequired = (handler: TwoFactorRequiredHandler | null) => {
  twoFactorRequiredHandler = handler;
};

/** Whether an external token provider is active (Clerk mode). */
export const isExternalAuthMode = () => accessTokenProvider !== null;

export const resolveAccessToken = async (options?: ResolveTokenOptions): Promise<string | null> => {
  if (accessTokenProvider) {
    // Coalesce concurrent force-refreshes so a burst of 401s triggers a single provider refresh.
    if (options?.forceRefresh) {
      if (!inFlightRefresh) {
        const provider = accessTokenProvider;
        inFlightRefresh = Promise.resolve()
          .then(() => provider(options))
          .then((token) => token ?? null)
          .catch(() => null)
          .finally(() => {
            inFlightRefresh = null;
          });
      }

      return inFlightRefresh;
    }

    try {
      return (await accessTokenProvider(options)) ?? null;
    } catch {
      return null;
    }
  }

  return getFromLocalStorage('access_token');
};

export const triggerUnauthorized = () => {
  unauthorizedHandler?.();
};

export const triggerTwoFactorRequired = () => {
  twoFactorRequiredHandler?.();
};
