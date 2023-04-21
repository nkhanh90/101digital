import { getServerSideProps } from '../../src/pages';
import { IncomingMessage, ServerResponse } from 'http';
import { Socket } from 'net';
import * as invoiceService from '../../src/service/invoiceService';
import { dummyInvoices, dummyTotalInvoices } from '../../mocks/dummyInvoices';

const dummyAccessToken = 'accesstoken';
const dummyOrgToken = 'orgtoken';

const createContext = () => {
  const request = new IncomingMessage(new Socket());
  request.headers = {};

  const response = new ServerResponse(request);

  return {
    query: '',
    req: request,
    res: response,
  };
};
jest.mock('../../src/service/invoiceService', () => ({
  getInvoices: () => ({
    data: dummyInvoices,
    paging: {
      totalRecords: dummyTotalInvoices,
    },
  }),
}));

jest.mock('../../src/utils/cookiesUtils', () => ({
  getAccessTokenServerside: () => dummyAccessToken,
  getOrgTokenServerside: () => dummyOrgToken,
}));

const spiedGetInvoices = jest.spyOn(invoiceService, 'getInvoices');

describe('Homepage - Serverside render', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('render invoice correctly', async () => {
    const context = createContext();
    const response = await getServerSideProps(context);
    const expectedResponse = {
      props: {
        data: {
          data: dummyInvoices,
          paging: {
            totalRecords: dummyTotalInvoices,
          },
        },
      },
    };

    expect(response).toStrictEqual(expectedResponse);
  });
});
