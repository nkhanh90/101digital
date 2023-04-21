import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useFormikContext } from 'formik';

interface ISjDatePickerProps {
  label: string;
  placeholder?: string;
  name: string;
  disabled?: boolean;
  minDate?: string;
  maxDate?: string;
  helpText?: string;
}

function DDatePicker({ label, name }: ISjDatePickerProps) {
  const { values, touched, errors, setValues, setFieldTouched } = useFormikContext<any>();

  return (
    <Box mb={4}>
      {label && <InputLabel>{label}</InputLabel>}
      <DatePicker
        // value={dayjs(values[name] ?? '')}
        onChange={(e: any) => {
          if (e) {
            setValues({
              ...values,
              [name]: dayjs(e),
            });
          } else {
            setValues({
              ...values,
              [name]: null,
            });
          }
        }}
      />
      {touched[name] && Boolean(errors[name]) && (
        <Typography fontSize={12} mt={1} color='red'>
          {errors[name]?.toString()}
        </Typography>
      )}
    </Box>
  );
}

export default DDatePicker;
