import './styles.css';
import { Provider as AuthProvider } from '../context/AuthContext';
import { Provider as UsuarioContext } from '../context/UsuarioContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <UsuarioContext>
        <Component {...pageProps} />
      </UsuarioContext>
    </AuthProvider>
  );
}

export default MyApp;
