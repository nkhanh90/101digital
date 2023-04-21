import { IExtensionProps } from '@/interface/IInvoice';
import { Box, Button, Stack, Typography } from '@mui/material';
import { FormikValues, useFormikContext } from 'formik';

function Extension({ extensions, p }: { extensions: IExtensionProps[]; p?: 0 }) {
  const { values, setValues } = useFormikContext<FormikValues>();
  if (extensions.length === 0) {
    return <Typography color='gray'>No extensions</Typography>;
  }

  const onDelete = (index: number) => {
    const extensionArr = values.extensions.length === 1 ? [] : [...values.extensions];
    extensionArr.splice(index, 1);
    setValues({
      ...values,
      extensions: extensionArr,
    });
  };

  return (
    <Box px={p ?? 2}>
      {extensions.map((item, index) => (
        <Stack key={item.name} direction='row'>
          <Typography width='150px'>Extension {index}</Typography>
          <Box>
            <Typography>Name: {item.name}</Typography>
            <Typography>Value: {item.value}</Typography>
            <Typography>Type: {item.type}</Typography>
            <Typography>Add Deduct: {item.addDeduct}</Typography>
          </Box>
          <Button type='button' sx={{ alignSelf: 'flex-start' }} onClick={() => onDelete(index)}>
            Delete
          </Button>
        </Stack>
      ))}
    </Box>
  );
}

export default Extension;
