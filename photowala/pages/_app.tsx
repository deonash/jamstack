import { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import '../styles/globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthProvider } from '../contexts/AuthContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7C3AED',
    },
    secondary: {
      main: '#3B82F6',
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp; 