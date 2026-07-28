import { initData, isTMA } from '@telegram-apps/sdk-react';

import { deleteFromLocalStorage, getFromLocalStorage, setToLocalStorage } from './storage';

import { auth } from '../api/auth';

type ITokens = {
  access_token: string;
  refresh_token?: string | null;
};

/**
 * Raised when the tenant's auth provider answers a sign-in with a one-time Clerk ticket
 * (`{ ticket, expires_at }`) instead of a session. This localStorage flow cannot complete such a
 * sign-in, but the session is **not** dead: the app is expected to exchange the ticket via Clerk JS
 * (`signIn.create({ strategy: 'ticket', ticket })`) and register `setAccessTokenProvider`. Callers
 * must treat it as "retry once the provider is ready", never as a reason to sign the user out.
 */
export class ExternalAuthRequiredError extends Error {
  constructor(
    message = 'Sign-in returned a Clerk ticket instead of a session; exchange it via Clerk and register setAccessTokenProvider',
  ) {
    super(message);
    this.name = 'ExternalAuthRequiredError';
  }
}

export function setTokens({ access_token, refresh_token }: ITokens) {
  access_token && setToLocalStorage('access_token', access_token);
  refresh_token && setToLocalStorage('refresh_token', refresh_token);
}

export function deleteTokens() {
  deleteFromLocalStorage('access_token');
  deleteFromLocalStorage('refresh_token');
}

export async function refreshTokens(): Promise<ITokens> {
  const refresh_token = getFromLocalStorage('refresh_token');

  if (refresh_token) {
    const refreshResponse = await auth.refresh.refresh_token({ refresh_token });

    setTokens(refreshResponse);
    return refreshResponse;
  }

  if (isTMA()) {
    initData.restore();
    const hash = initData.hash();
    const init_data_raw = initData.raw();
    if (!hash || !init_data_raw) {
      return Promise.reject(new Error('No TG ID, hash or init data raw found in tokensFactory'));
    }

    const telegramSignInResponse = await auth.signin.telegram({
      hash,
      init_data_raw,
    });

    // A malformed body (empty response, HTML error page) leaves the session unusable, so it stays a
    // plain error and drives the caller's sign-out path.
    if (typeof telegramSignInResponse !== 'object' || telegramSignInResponse === null) {
      return Promise.reject(new Error('Telegram sign-in returned an unexpected response body'));
    }

    // Clerk tenants answer with a one-time sign-in ticket instead of a session: there is no bearer
    // token to store here. Those apps exchange the ticket via Clerk JS and register
    // `setAccessTokenProvider`, which bypasses this localStorage flow entirely — so this is a
    // recoverable state, not a dead session.
    if (!('access_token' in telegramSignInResponse)) {
      return Promise.reject(new ExternalAuthRequiredError());
    }

    setTokens(telegramSignInResponse);
    return telegramSignInResponse;
  }

  return Promise.reject(new Error('No refresh token found'));
}

export function getTokens() {
  return {
    access_token: getFromLocalStorage('access_token'),
    refresh_token: getFromLocalStorage('refresh_token'),
  };
}
