import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Formik, FormikErrors } from 'formik';
import DInput from '../Form/Input';
import DSelect from '../Form/Select';
import { ExtensionTypes, IExtensionProps, IInvoiceItemProps, IInvoiceSubFieldProps } from '@/interface/IInvoice';
import { Box, Grid, Stack, Typography } from '@mui/material';
// import AddExtension from './AddExtension';
import AddCustomFieldDialog from './AddCustomField';
import Extension from './Extension';
import CustomField from './CustomFields';

const AmountTypes = [
  {
    label: 'Percentage',
    value: ExtensionTypes.PERCENTAGE,
  },
  {
    label: 'Fixed value',
    value: ExtensionTypes.FIXED_VALUE,
  },
];

const DeductTypes = [
  {
    label: 'Add',
    value: 'ADD',
  },
  {
    label: 'Deduct',
    value: 'DEDUCT',
  },
];

export default function AddInvoiceItem({ onAddItem }: { onAddItem: (extension: any) => void }) {
  const [open, setOpen] = React.useState(false);
  const [extensions, setExtensions] = React.useState<IExtensionProps[] | []>([]);
  const [customFields, setCustomFields] = React.useState<IInvoiceSubFieldProps[] | []>([]);

  const onAddExtension = (value: IExtensionProps) => {
    setExtensions([...extensions, value]);
  };

  const onAddCustomField = (value: IInvoiceSubFieldProps) => {
    setCustomFields([...customFields, value]);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (values: IInvoiceItemProps) => {
    onAddItem({
      ...values,
      extensions,
      customFields,
    });
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleClickOpen} sx={{ ml: 2 }}>
        + Add extension
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <DialogTitle>Add new custom field</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              itemReference: '',
              description: '',
              quantity: 0,
              rate: 0,
              itemName: '',
              itemUOM: '',
              customFields: customFields,
              extensions: extensions,
            }}
            validate={(values) => {
              const errors: FormikErrors<any> = {};
              (Object.keys(values) as (keyof typeof values)[]).forEach((key, index) => {
                if (!values[key]) {
                  errors[key] = 'This field is required';
                }
              });
              return errors;
            }}
            onSubmit={onSubmit}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6} lg={6}>
                    <DInput name='itemName' label='Name' />
                    <DInput name='description' label='Description' />
                    <DInput name='rate' label='Rate' />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <DInput name='itemReference' label='Reference' />
                    <DInput name='itemUOM' label='UOM' />
                    <DInput name='quantity' label='Quantity' />
                  </Grid>
                </Grid>
                <Box mb={2}>
                  <Stack direction='row'>
                    <Typography fontSize='20px'>Extensions</Typography>
                    {/* <AddExtension onAddItem={onAddExtension} /> */}
                  </Stack>
                  <Extension extensions={extensions} />
                </Box>
                <Box>
                  <Box mb={2}>
                    <Stack direction='row'>
                      <Typography fontSize='20px'>Custom fields</Typography>
                      <AddCustomFieldDialog onAddItem={onAddCustomField} />
                    </Stack>
                    <CustomField customFields={customFields} />
                  </Box>
                </Box>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type='submit'>Add</Button>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}
