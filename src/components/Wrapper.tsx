import { IReduxState } from '@/interface/IRedux';
import { clearToast } from '@/redux/toast/toastSlice';
import { Alert, Box, Snackbar, Typography } from '@mui/material';
import { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function AppWrapper({ children }: { children: ReactElement }) {
  const { toast } = useSelector((state: IReduxState) => state);
  const dispatch = useDispatch();
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'aliceblue', py: 5 }}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={typeof toast.type === 'string'}
        autoHideDuration={6000}
        onClose={() => {
          dispatch(clearToast());
        }}
      >
        <Alert
          onClose={() => {
            dispatch(clearToast());
          }}
          severity={toast.type ?? 'warning'}
          sx={{ width: '100%' }}
        >
          <>
            <Typography>{toast.title}</Typography>
            {toast.description}
          </>
        </Alert>
      </Snackbar>
      {children}
    </Box>
  );
}

export default AppWrapper;
