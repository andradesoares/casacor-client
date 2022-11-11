import './styles.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Provider as AuthProvider } from '../context/AuthContext';
import { Provider as UsuarioContext } from '../context/UsuarioContext';
import Analytics from '../components/Analytics';
import * as gtag from '../services/gtag';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <AuthProvider>
      <UsuarioContext>
        <Component {...pageProps} />
        <Analytics />
      </UsuarioContext>
    </AuthProvider>
  );
}

export default MyApp;
