import { IInvoiceProps, INVOICE_TYPE } from '@/interface/IInvoice';
import { IInvoiceResponseProps } from '@/service/invoiceService';

export const dummyInvoices: IInvoiceProps[] = [
  // {
  //   invoiceId: '79b9457c-b5a7-4e5c-bb45-0be9d3797418',
  //   invoiceNumber: 'INV1652377472736',
  //   invoiceDate: '2096-05-12',
  //   createdAt: '2022-05-12T17:44:45.152',
  //   dueDate: '2021-06-04',
  //   status: [{ key: 'Overdue', value: true }],
  //   subStatus: [],
  //   numberOfDocuments: 1,
  //   totalTax: 101,
  //   totalAmount: 991,
  //   balanceAmount: 991,
  //   description: '',
  //   totalPaid: 0,
  //   invoiceSubTotal: 910,
  //   type: INVOICE_TYPE.TAX_INVOICE,
  //   customFields: [
  //     { key: 'invoiceCustomField', value: 'value' },
  //     { key: 'createdBy', value: 'd2258c8d-96b2-48e4-9e4f-0316e3f98059' },
  //   ],
  //   totalDiscount: 110,
  //   extensions: [],
  //   version: '1',
  //   customer: {
  //     id: 'b605ad26-dd5d-4ea3-a7de-a0b7c5219528',
  //     firstName: 'Nguyen',
  //     lastName: 'Dung 2',
  //     addresses: [],
  //   },
  //   merchant: { id: '6bf32cc4-2dfb-40c6-bd41-a6aea55fd4dc' },
  // },
];

export const dummyTotalInvoices = 900;
