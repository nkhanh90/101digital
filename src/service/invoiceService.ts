import { AxiosRequestConfig } from 'axios';
import customAxios from '@/utils/customAxios';
import { IInvoiceProps } from '@/interface/IInvoice';

export interface IInvoiceResponseProps {
  data: {
    data: IInvoiceProps[];
    paging: {
      totalRecords: number;
    };
  };
}

export const getInvoices = async (
  token: {
    accessToken: string;
    orgToken: string;
  },
  query: string
): Promise<{
  data: IInvoiceResponseProps;
}> => {
  const url = `https://sandbox.101digital.io/invoice-service/1.0.0/invoices?${query}`;
  console.log(url);
  const params: AxiosRequestConfig = {
    method: 'GET',
    url,
    headers: { accept: '*/*', 'org-token': token.orgToken, Authorization: `Bearer ${token.accessToken}` },
  };
  const response = await customAxios.request({ ...params });
  return response.data;
};
