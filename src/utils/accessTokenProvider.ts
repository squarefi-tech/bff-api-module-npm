import { getFromLocalStorage } from './storage';

export type ResolveTokenOptions = {
  /** Force the provider to mint a fresh token, bypassing any cache (used on 401 retry). */
  forceRefresh?: boolean;
};

export type AccessTokenProvider = (options?: ResolveTokenOptions) => Promise<string | null | undefined>;

export type UnauthorizedHandler = () => void;

/** Details the backend attaches to a step-up (2FA reverification) rejection. */
export type ReverificationMeta = Record<string, unknown>;

/**
 * Handler that performs a step-up reverification (e.g. re-entering an already-enrolled second
 * factor). Resolves `true` once the user has re-verified so the original request can be retried,
 * or `false` if the reverification was cancelled or failed.
 */
export type ReverificationHandler = (meta: ReverificationMeta) => Promise<boolean>;

let accessTokenProvider: AccessTokenProvider | null = null;
let unauthorizedHandler: UnauthorizedHandler | null = null;
let reverificationHandler: ReverificationHandler | null = null;
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
 * Register a handler invoked when the backend rejects a request because a step-up 2FA
 * reverification is required (HTTP `403` with a `two_factor_reverification_required` code). The
 * handler drives the provider-specific re-verification (e.g. Clerk) and resolves `true` on success
 * so the API client retries the original request once. Pass `null` to unregister.
 */
export const setOnReverificationRequired = (handler: ReverificationHandler | null) => {
  reverificationHandler = handler;
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

/** Invokes the registered reverification handler; resolves `false` when none is registered. */
export const triggerReverification = (meta: ReverificationMeta): Promise<boolean> =>
  reverificationHandler ? reverificationHandler(meta) : Promise.resolve(false);
