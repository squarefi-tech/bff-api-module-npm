export const getFromLocalStorage = (key: string) => {
  if (typeof window === 'undefined') {
    // eslint-disable-next-line no-console
    console.error('call getFromLocalStorage in server side');
    return null;
  }

  return localStorage.getItem(key);
};

export const setToLocalStorage = (key: string, value: string) => {
  if (typeof window === 'undefined') {
    // eslint-disable-next-line no-console
    console.error('call setToLocalStorage in server side');
    return;
  }

  localStorage.setItem(key, value);
};

export const deleteFromLocalStorage = (key: string) => {
  if (typeof window === 'undefined') {
    // eslint-disable-next-line no-console
    console.error('call deleteFromLocalStorage in server side');
    return;
  }

  localStorage.removeItem(key);
};
