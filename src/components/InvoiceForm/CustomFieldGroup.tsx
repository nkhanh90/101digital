import DInput from '@/components/Form/Input';
import { IInvoiceSubFieldProps } from '@/interface/IInvoice';
import { Box, InputLabel, Stack, Typography } from '@mui/material';

function CustomFieldGroup({ name, data, level }: { name: string; data: IInvoiceSubFieldProps[]; level?: number }) {
  return (
    <>
      {level === 2 ? (
        <InputLabel htmlFor={name}>Custom fields</InputLabel>
      ) : (
        <Typography fontSize='20px'>Custom fields</Typography>
      )}
      {data.map((item: IInvoiceSubFieldProps, index: number) => (
        <Box key={index}>
          <Stack direction='row' gap={1}>
            <DInput name={`${name}.${index}.key`} label='Key' />
            <DInput name={`${name}.${index}.value`} label='Value' />
          </Stack>
        </Box>
      ))}
    </>
  );
}

export default CustomFieldGroup;
