/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { Formik, FormikErrors, FormikProps } from 'formik';
import { ILoginFormProps } from '@/service/authProvider';
import { isEmail } from '@/utils/regex';
import Input from '@/components/Form/Input';
import { useDispatch, useSelector } from 'react-redux';
import { getMe, login } from '@/redux/auth/authSlice';
import { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { IReduxState } from '@/interface/IRedux';
import { showToast } from '@/redux/toast/toastSlice';

export default Login;

function Login({ clientId, clientSecret }: { clientId: string; clientSecret: string }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { auth } = useSelector((state: IReduxState) => state);

  const onSubmit = (values: ILoginFormProps) => {
    dispatch(login(values));
  };

  useEffect(() => {
    if (!auth?.data && !auth?.isChecked) {
      dispatch(getMe());
    }
    if (auth.data) {
      router.push('/');
    }
    if (auth.error) {
      dispatch(
        showToast({
          type: 'error',
          title: 'Username or Password is incorrect',
        })
      );
    }
  }, [auth]);

  return (
    <Box
      sx={{
        flexDirection: 'column',
        minHeight: '100vh',
        maxHeight: '-webkit-fill-available',
        overflow: 'hidden',
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
      }}
    >
      <Box sx={{ width: 500, backgroundColor: 'white', p: 4 }}>
        <Formik
          initialValues={{
            clientId,
            clientSecret,
            username: '',
            password: '',
          }}
          validate={(values) => {
            const errors: FormikErrors<ILoginFormProps> = {};
            if (!values.username) {
              errors.username = 'Please enter username.';
            } else if (!isEmail(values.username)) {
              errors.username = 'Invalid email address';
            }
            if (!values.password) {
              errors.password = 'Please enter password.';
            }
            return errors;
          }}
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Input name='username' label='Username' placeholder='Enter email' />
              <Input name='password' label='Password' placeholder='Enter password' type='password' />
              <Button variant='contained' type='submit' disabled={auth.pending} sx={{ width: '100%', my: 2 }}>
                LOG IN
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}

export async function getStaticProps() {
  return {
    props: {
      clientId: process.env.API_CLIENT_ID,
      clientSecret: process.env.API_CLIENT_SECRET,
    },
  };
}
