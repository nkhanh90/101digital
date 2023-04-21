import React from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { wrapper } from '@/redux/store';
import { CookiesProvider } from 'react-cookie';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../utils/createEmotionCache';
import AppWrapper from '@/components/Wrapper';
import { LocalizationProvider } from '@mui/x-date-pickers';

export const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: '40px',
        },
      },
    },
  },
});
const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps, emotionCache = clientSideEmotionCache } = props;
  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CookiesProvider>
              <AppWrapper>
                <Component {...pageProps} />
              </AppWrapper>
            </CookiesProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}
export default MyApp;
