/* eslint-disable no-param-reassign */
import axios, { InternalAxiosRequestConfig } from 'axios';
import { getStorage, orgTokenKey, tokenKey } from './localStorage';
import { COOKIE_KEY, getAccessTokenServerside, getOrgTokenServerside, removeCookies } from './cookiesUtils';
// import { getStorage, tokenKey } from './localStorage';

export const baseUrl = process.env.REACT_APP_API_BASE_URL || '';
export const basePath = process.env.REACT_APP_API_PREFIX || '';
export const apiUrl = baseUrl + basePath;

interface Error {
  code: number;
  message: string;
  type: string;
}
export interface ErrorResponse {
  error: Error;
}

const axiosClient = axios.create({
  timeout: 25000,
});

axiosClient.interceptors.request.use(async (req: InternalAxiosRequestConfig) => {
  if (!req.url?.startsWith('http') && !req.url?.startsWith('//')) {
    if (req.url?.startsWith('/')) {
      req.url = baseUrl + req.url;
    } else {
      req.url = `${apiUrl}/${req.url}`;
    }
  }
  return req;
});

export default axiosClient;
