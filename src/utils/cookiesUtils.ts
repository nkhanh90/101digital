import Cookies from 'universal-cookie';
import { getCookie, setCookie } from 'cookies-next';
import { IncomingMessage, ServerResponse } from 'http';

export const COOKIE_KEY = {
  accessToken: 'access_token',
  orgToken: 'org-token',
};

export const setTokensCookies = (
  cookie: string,
  value: string,
  path = '/', // cookie accessible to all page
  httpOnly = false,
): void => {
  const cookies = new Cookies();
  cookies.set(cookie, value, {
    path: path, // cookie accessible to path
    sameSite: false,
  });
  // Store data in cookies
};

export const getTokensCookies = (cookie: string): string => {
  const cookies = new Cookies();

  // get data in cookies and return it
  return cookies.get<string>(cookie);
};

export const removeCookies = (cookie: string[]): void => {
  const cookies = new Cookies();

  // delete in cookies
  cookie.forEach((item) => cookies.remove(item, { path: '/' }));
};

export const getAccessTokenServerside = (req?: IncomingMessage, res?: ServerResponse) => {
  return getCookie(COOKIE_KEY.accessToken, { req, res });
};

export const getOrgTokenServerside = (req?: IncomingMessage, res?: ServerResponse) => {
  return getCookie(COOKIE_KEY.orgToken, { req, res });
};
