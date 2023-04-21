import { IExtensionProps, IInvoiceSubFieldProps } from '@/interface/IInvoice';
import { Box, Button, Stack, Typography } from '@mui/material';
import { FormikValues, useFormikContext } from 'formik';

function CustomField({ customFields, p }: { customFields: IInvoiceSubFieldProps[]; p?: number }) {
  const { values, setValues } = useFormikContext<FormikValues>();
  if (customFields.length === 0) {
    return <Typography color='gray'>No custom fields</Typography>;
  }

  const onDelete = (index: number) => {
    const arr = values.customFields.length === 1 ? [] : [...values.customFields];
    arr.splice(index, 1);
    setValues({
      ...values,
      customFields: arr,
    });
  };

  return (
    <Box px={p ?? 2}>
      {customFields.map((item, index) => (
        <Stack key={item.key} direction='row'>
          <Typography width='150px'>Custom Field {index}</Typography>
          <Box>
            <Typography>Key: {item.key}</Typography>
            <Typography>Value: {item.value}</Typography>
          </Box>
          <Button type='button' sx={{ alignSelf: 'flex-start' }} onClick={() => onDelete(index)}>
            Delete
          </Button>
        </Stack>
      ))}
    </Box>
  );
}

export default CustomField;
