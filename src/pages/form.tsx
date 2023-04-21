import DDatePicker from '@/components/Form/Date';
import DInput from '@/components/Form/Input';
import DSelect from '@/components/Form/Select';
import CustomFieldGroup from '@/components/InvoiceForm/CustomFieldGroup';
import ExtensionGroup from '@/components/InvoiceForm/ExtensionGroup';
import {
  ExtensionTypes,
  IAddressProps,
  IDocumentProps,
  IExtensionProps,
  IInvoiceFormProps,
} from '@/interface/IInvoice';
import { showToast } from '@/redux/toast/toastSlice';
import { isEmail } from '@/utils/regex';
import { Box, Button, Container, Grid, InputLabel, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { Formik, FormikErrors } from 'formik';
import { values } from 'lodash';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const documentList = [
  {
    documentId: '96ea7d60-89ed-4c3b-811c-d2c61f5feab2',
    documentName: 'Bill',
    documentUrl: 'http://url.com/#123',
  },
];

const initAddress = {
  premise: 'CT11',
  countryCode: 'VN',
  postcode: '1000',
  county: 'hoangmai',
  city: 'hanoi',
};

const initValue: IInvoiceFormProps = {
  bank: {
    bankId: '',
    sortCode: '',
    accountNumber: '',
    accountName: '',
  },
  customer: {
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    addresses: [],
  },
  documents: [],
  invoiceReference: '',
  invoiceNumber: '',
  currency: '',
  invoiceDate: dayjs().format('YYYY-MM-DD'),
  dueDate: '',
  description: '',
  customFields: [],
  extensions: [],
  items: [],
};

const initExtension: IExtensionProps = {
  addDeduct: 'ADD',
  value: 10,
  name: 'Add 1',
  type: ExtensionTypes.PERCENTAGE,
};

function FormPage() {
  const dispatch = useDispatch();
  const onSubmit = (values: any) => {
    dispatch(
      showToast({
        type: 'success',
        title: 'You have created a new invoice successfully',
      })
    );
    console.log(values);
  };

  return (
    <Container>
      <Typography fontSize='40px' mb={3}>
        Add invoice
      </Typography>
      <Formik
        initialValues={initValue}
        validate={(values) => {
          const errors: FormikErrors<IInvoiceFormProps> = {};
          (Object.keys(values) as (keyof typeof values)[]).forEach((key, index) => {
            if (typeof values[key] === 'string' && !values[key]) {
              errors[key] = 'This field is required';
            }
          });
          if (values.customer.email && !isEmail(values.customer.email)) {
            errors.customer = {
              ...errors.customer,
              email: 'Please enter email format.',
            };
          }

          return errors;
        }}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, setValues, values }) => (
          <form onSubmit={handleSubmit}>
            <Box mb={4}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={6}>
                  <Typography fontSize='20px' mb={2}>
                    Invoice Info
                  </Typography>
                  <DInput name='invoiceNumber' label='Invoice Number' />
                  <DInput name='description' label='Description' type='textarea' />
                  <DInput name='invoiceReference' label='Invoice Reference' />
                  <DInput name='currency' label='Currency' />
                  <DDatePicker name='dueDate' label='Due date' />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Typography fontSize='20px' mb={2}>
                    Bank Account
                  </Typography>
                  <DInput name='bank.bankId' label='Bank Id' />
                  <DInput name='bank.sortCode' label='Sort Code' type='textarea' />
                  <DInput name='bank.accountNumber' label='Account Number' />
                  <DInput name='bank.accountName' label='Account Name' />
                  <DSelect<IDocumentProps[], IDocumentProps>
                    options={documentList}
                    name='document'
                    label='Document'
                    valueExpr='documentId'
                    displayExpr='documentName'
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={12}>
                  <Typography fontSize='20px' mb={2}>
                    Customer
                  </Typography>
                  <DInput name='customer.firstName' label='First Name' />
                  <DInput name='customer.lastName' label='Last Name' type='textarea' />
                  <DInput name='customer.email' label='Email' />
                  <DInput name='customer.mobileNumber' label='Mobile Number' />
                  <Box>
                    <Box>
                      <InputLabel>Address</InputLabel>
                    </Box>
                    <Box>
                      {values.customer.addresses.map((item: IAddressProps, index: number) => (
                        <Box key={index}>
                          <Stack direction='row' gap={1}>
                            <DInput name={`customer.addresses.${index}.premise`} label='Premise' />
                            <DInput name={`customer.addresses.${index}.countryCode`} label='Country Code' />
                            <DInput name={`customer.addresses.${index}.postcode`} label='Postcode' />
                            <DInput name={`customer.addresses.${index}.county`} label='Country' />
                            <DInput name={`customer.addresses.${index}.city`} label='City' />
                          </Stack>
                        </Box>
                      ))}
                    </Box>
                    <Button
                      type='button'
                      onClick={() => {
                        setValues({
                          ...values,
                          customer: {
                            ...values.customer,
                            addresses: [...values.customer.addresses, initAddress],
                          },
                        });
                      }}
                      sx={{ ml: 2, p: 0 }}
                    >
                      + Add address
                    </Button>
                  </Box>
                </Grid>
              </Grid>
              <Box>
                <Box my={2}>
                  <Box mb={2}>
                    <ExtensionGroup name='extensions' data={values.extensions} />
                    <Button
                      type='button'
                      onClick={() => {
                        setValues({
                          ...values,
                          extensions: [...values.extensions, initExtension],
                        });
                      }}
                      sx={{ ml: 2, p: 0 }}
                    >
                      + Add extension
                    </Button>
                  </Box>
                  <Box mb={2}>
                    <CustomFieldGroup name='customFields' data={values.customFields} />
                    <Button
                      type='button'
                      onClick={() => {
                        setValues({
                          ...values,
                          customFields: [
                            ...values.customFields,
                            {
                              key: '',
                              value: '',
                            },
                          ],
                        });
                      }}
                      sx={{ ml: 2, p: 0 }}
                    >
                      + Add custom fields
                    </Button>
                  </Box>
                  <Box mb={2}>
                    <Typography fontSize='20px'>Invoice items</Typography>
                    {values.items.map((item, index) => (
                      <Box px={3} key={index}>
                        <Stack spacing={1} direction='row' useFlexGap flexWrap='wrap'>
                          <DInput name={`items.${index}.itemName`} label='Name' />
                          <DInput name={`items.${index}.itemReference`} label='Reference' />
                          <DInput name={`items.${index}.description`} label='Description' />
                        </Stack>
                        <Stack spacing={1} direction='row' useFlexGap flexWrap='wrap'>
                          <DInput name={`items.${index}.rate`} label='Rate' />
                          <DInput name={`items.${index}.itemUOM`} label='UOM' />
                          <DInput name={`items.${index}.quantity`} label='Quantity' />
                        </Stack>
                        <Box mb={2}>
                          <ExtensionGroup
                            name={`items.${index}.extensions`}
                            level={2}
                            data={values.items[index].extensions}
                          />
                          <Button
                            type='button'
                            onClick={() => {
                              const updateItems = [...values.items];
                              updateItems[index] = {
                                ...updateItems[index],
                                extensions: [...updateItems[index].extensions, initExtension],
                              };
                              console.log(updateItems);
                              setValues({
                                ...values,
                                items: updateItems,
                              });
                            }}
                            sx={{ ml: 2, p: 0 }}
                          >
                            + Add extension
                          </Button>
                        </Box>
                        <Box mb={2}>
                          <CustomFieldGroup
                            name={`items.${index}.customFields`}
                            level={2}
                            data={values.items[index].customFields}
                          />
                          <Button
                            type='button'
                            onClick={() => {
                              const updateItems = [...values.items];
                              updateItems[index] = {
                                ...updateItems[index],
                                customFields: [...updateItems[index].customFields, { key: '', value: '' }],
                              };

                              setValues({
                                ...values,
                                items: updateItems,
                              });
                            }}
                            sx={{ ml: 2, p: 0 }}
                          >
                            + Add custom field
                          </Button>
                        </Box>
                      </Box>
                    ))}
                    <Button
                      type='button'
                      onClick={() => {
                        setValues({
                          ...values,
                          items: [
                            ...values.items,
                            {
                              itemName: '',
                              itemReference: '',
                              description: '',
                              rate: 0,
                              itemUOM: '',
                              quantity: 0,
                              extensions: [],
                              customFields: [],
                            },
                          ],
                        });
                      }}
                      sx={{ ml: 2, p: 0 }}
                    >
                      + Add item
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Button type='submit'>Add</Button>
          </form>
        )}
      </Formik>
    </Container>
  );
}

export default FormPage;
