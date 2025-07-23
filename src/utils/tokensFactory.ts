import { initData, isTMA } from '@telegram-apps/sdk-react';

import { deleteFromLocalStorage, getFromLocalStorage, setToLocalStorage } from './storage';

import { auth } from '../api/auth';
import { API } from '../api/types/types';

type ITokens = {
  access_token: string;
  refresh_token?: string | null;
};

export function setTokens({ access_token, refresh_token }: ITokens) {
  access_token && setToLocalStorage('access_token', access_token);
  refresh_token && setToLocalStorage('refresh_token', refresh_token);
}

export function deleteTokens() {
  deleteFromLocalStorage('access_token');
  deleteFromLocalStorage('refresh_token');
}

export async function refreshTokens(): Promise<ITokens | null> {
  const refresh_token = getFromLocalStorage('refresh_token');

  if (refresh_token) {
    const refreshResponse = await auth.refresh.refresh_token({ refresh_token });

    setTokens(refreshResponse);
    return refreshResponse;
  }

  if (isTMA()) {
    const tg_id = initData.user()?.id;
    const hash = initData.hash();
    const init_data_raw = initData.raw();

    if (!tg_id || !hash || !init_data_raw) {
      return null;
    }

    const telegramSignInResponse = await auth.signin.telegram({
      tg_id: tg_id.toString(),
      hash,
      init_data_raw,
    });

    setTokens(telegramSignInResponse);
    return telegramSignInResponse;
  }

  return null;
}

export function getTokens() {
  return {
    access_token: getFromLocalStorage('access_token'),
    refresh_token: getFromLocalStorage('refresh_token'),
  };
}
