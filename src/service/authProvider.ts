import { AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';
import customAxios from '../utils/customAxios';

import { getStorage, orgTokenKey, tokenKey, tokenRefresh, userKey } from '@/utils/localStorage';
import { IUserProps } from '@/interface/IUser';

export type ILoginFormProps = {
  clientId: string;
  clientSecret: string;
  username: string;
  password: string;
};

export type ILoginApiResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: 'Bearer';
};

const login = async (payload: ILoginFormProps): Promise<AxiosResponse<ILoginApiResponse>> => {
  const params: AxiosRequestConfig = {
    method: 'POST',
    url: 'https://sandbox.101digital.io/token',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify({
      ...payload,
      client_id: payload.clientId,
      client_secret: payload.clientSecret,
      grant_type: 'password',
      scope: 'scope',
    }),
  };

  const response = await customAxios.request({ ...params });
  return response?.data;
};

const loadMe = async (token: string): Promise<AxiosResponse<IUserProps>> => {
  const params: AxiosRequestConfig = {
    method: 'GET',
    url: 'https://sandbox.101digital.io/membership-service/1.2.0/users/me',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await customAxios.request({ ...params });
  return response?.data?.data;
};

const getMe = async (): Promise<IUserProps> => {
  const user = getStorage(userKey);

  if (user) {
    return Promise.resolve(user);
  }

  return Promise.reject(false);
};

const authProvider = {
  login,
  loadMe,
  getMe,
};

export default authProvider;
