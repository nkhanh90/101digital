export const tokenKey = `${process.env.APP_NAMESPACE}.token`;
export const orgTokenKey = `${process.env.APP_NAMESPACE}.orgToken`;
export const tokenRefresh = `${process.env.APP_NAMESPACE}.tokenRefresh`;
export const userKey = `${process.env.APP_NAMESPACE}.user`;

export const handleStorage = (name: string, value: any): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(name, JSON.stringify(value));
  }
};

export const deleteItemStorage = (name: string): void => {
  localStorage.removeItem(name);
};

export const clearStorage = (): void => {
  localStorage.clear();
};

export const getStorage = (name: string) => {
  if (typeof window !== 'undefined') {
    const data = window.localStorage.getItem(name);
    if (data) return JSON.parse(data);
  }

  return undefined;
};
