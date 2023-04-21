export enum INVOICE_TYPE {
  TAX_INVOICE = 'TAX_INVOICE',
}

export type IInvoiceSubFieldProps = {
  key: string;
  value: boolean | string;
};

export type IInvoiceCustomerProps = {
  id: string;
  firstName: string;
  lastName: string;
  addresses: string[];
};

export enum ExtensionTypes {
  PERCENTAGE = 'PERCENTAGE',
  FIXED_VALUE = 'FIXED_VALUE',
}

export type IExtensionProps = {
  addDeduct: string;
  value: number;
  type: ExtensionTypes;
  name: string;
};

export type IAddressProps = {
  premise: string;
  countryCode: string;
  postcode: string;
  county: string;
  city: string;
};

export type IInvoiceItemProps = {
  itemReference: string;
  description: string;
  quantity: number;
  rate: number;
  itemName: string;
  itemUOM: string;
  customFields: IInvoiceSubFieldProps[];
  extensions: IExtensionProps[];
};

export type IDocumentProps = {
  documentId: string;
  documentName: string;
  documentUrl: string;
};

export type IInvoiceFormProps = {
  bank: {
    bankId: string;
    sortCode: string;
    accountNumber: string;
    accountName: string;
  };
  customer: {
    firstName: string;
    lastName: string;
    mobileNumber: string;
    email: string;
    addresses: IAddressProps[];
  };
  documents: IDocumentProps[];
  invoiceReference: string;
  invoiceNumber: string;
  currency: string;
  invoiceDate: string;
  dueDate: string;
  description: string;
  customFields: IInvoiceSubFieldProps[];
  extensions: IExtensionProps[];
  items: IInvoiceItemProps[];
};

export interface IInvoiceProps {
  invoiceId: string;
  invoiceNumber: string;
  type: INVOICE_TYPE;
  currency?: string;
  invoiceDate: string;
  createdAt: string;
  dueDate: string;
  status: IInvoiceSubFieldProps[];
  subStatus: any[];
  numberOfDocuments: number;
  totalTax: number;
  totalAmount: number;
  balanceAmount: number;
  description: string;
  totalPaid: number;
  invoiceSubTotal: number;
  customFields: IInvoiceSubFieldProps[];
  totalDiscount: number;
  extensions: IExtensionProps[] | [];
  version: string;
  customer: IInvoiceCustomerProps;
  merchant: { id: string };
  purchaseOrderMatched?: boolean;
  isRegulated?: boolean;
  isInsured?: boolean;
}
