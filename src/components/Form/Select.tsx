import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FormikValues, useFormikContext } from 'formik';

interface DSelectProps<Y> {
  label?: string;
  name: string;
  disabled?: boolean;
  options: Y[];
  valueExpr: keyof Y;
  displayExpr: keyof Y;
}

function DSelect<T, Y>({ label, name, options, valueExpr, displayExpr }: DSelectProps<Y>) {
  const { values, setValues, touched, errors } = useFormikContext<FormikValues>();

  return (
    <Box mb={2}>
      {label && <InputLabel sx={{ whiteSpace: 'break-spaces' }}>{label}</InputLabel>}
      <Select
        value={values[name] ?? ''}
        onChange={(e) => {
          setValues({
            ...values,
            [name]: e.target.value,
          });
        }}
        fullWidth
        error={touched[name] && Boolean(errors[name])}
      >
        {options.map((item: Y) => {
          const v: any = item[valueExpr];
          const d: any = item[displayExpr];
          return (
            <MenuItem value={v} key={v}>
              {d}
            </MenuItem>
          );
        })}
      </Select>
      {touched[name] && errors[name] && (
        <Typography fontSize={12} mt={1} color='red'>
          {errors[name]?.toString()}
        </Typography>
      )}
    </Box>
  );
}

export default DSelect;
