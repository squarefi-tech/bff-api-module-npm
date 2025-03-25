import { initData, isTMA } from '@telegram-apps/sdk-react';

import { deleteFromLocalStorage, getFromLocalStorage, setToLocalStorage } from './storage';

import { auth } from '../api/auth';

type SetTokensProps = {
  access_token: string;
  refresh_token?: string;
};

export function setTokens({ access_token, refresh_token }: SetTokensProps) {
  access_token && setToLocalStorage('access_token', access_token);
  refresh_token && setToLocalStorage('refresh_token', refresh_token);
}

export function deleteTokens() {
  deleteFromLocalStorage('access_token');
  deleteFromLocalStorage('refresh_token');
}

export async function refreshTokens() {
  const refreshToken = getFromLocalStorage('refresh_token');

  if (!refreshToken && !isTMA()) {
    return null;
  }

  const refreshHandler = () =>
    isTMA()
      ? auth.signin.telegram({
          tg_id: initData.user()?.id as number,
          hash: initData.hash() as string,
          init_data_raw: initData.raw() as string,
        })
      : auth.refresh.refresh_token(refreshToken as string);

  const tokens = await refreshHandler();

  setTokens(tokens);

  return tokens;
}

export function getTokens() {
  return {
    access_token: getFromLocalStorage('access_token'),
    refresh_token: getFromLocalStorage('refresh_token'),
  };
}
