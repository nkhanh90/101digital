import DInput from '@/components/Form/Input';
import { Box, InputLabel, Stack, Typography } from '@mui/material';
import { IExtensionProps } from '@/interface/IInvoice';

function ExtensionGroup({ name, data, level }: { name: string; data: IExtensionProps[]; level?: number }) {
  return (
    <>
      {level === 2 ? (
        <InputLabel htmlFor={name}>Extensions</InputLabel>
      ) : (
        <Typography fontSize='20px'>Extensions</Typography>
      )}
      {data.map((item: IExtensionProps, index: number) => (
        <Box key={index}>
          <Stack direction='row' gap={1}>
            <DInput name={`${name}.${index}.addDeduct`} label='Deduct' />

            <DInput name={`${name}.${index}.value`} label='Value' />
            <DInput name={`${name}.${index}.type`} label='Type' />
            <DInput name={`${name}.${index}.name`} label='Name' />
          </Stack>
        </Box>
      ))}
    </>
  );
}

export default ExtensionGroup;
