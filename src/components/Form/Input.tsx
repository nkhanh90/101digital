import { Box, InputLabel, TextField, Typography } from '@mui/material';
import { FormikValues, useFormikContext } from 'formik';
import { useEffect, useState } from 'react';

interface IInputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  name: string;
  disabled?: boolean;
}

function DInput({ label, placeholder, name, type, disabled }: IInputProps) {
  const { values, handleChange, touched, errors, status } = useFormikContext<FormikValues>();

  const [inputType, setInputType] = useState('text');

  useEffect(() => {
    if (type) {
      setInputType(type);
    }
  }, [type]);

  const getPlaceholder = () => {
    if (typeof status === 'boolean' && !status) {
      return 'Loading...';
    }
    return placeholder ?? '';
  };

  return (
    <Box sx={{ mb: 2 }}>
      {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
      <TextField
        fullWidth
        value={values[name]}
        type={inputType}
        name={name}
        id={name}
        placeholder={getPlaceholder()}
        onChange={handleChange}
        disabled={disabled}
        error={touched[name] && Boolean(errors[name])}
      />
      {touched[name] && Boolean(errors[name]) && (
        <Typography fontSize={12} mt={1} color='red'>
          {errors[name]?.toString()}
        </Typography>
      )}
    </Box>
  );
}

export default DInput;
