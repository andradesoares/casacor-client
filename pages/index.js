import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { TryLocalSignin } from '../services/auth';
import FormLogin from '../components/login/formLogin';
import FormProfissionalCadastro from '../components/cadastro/formProfissionalCadastro';
import FormFornecedorCadastro from '../components/cadastro/formFornecedorCadastro';

import classes from './index.module.scss';

function AuthPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [usuario, setUsuario] = useState('profissional');
  const [login, setLogin] = useState(true);

  useEffect(() => {
    TryLocalSignin(router.push);

    let timer1 = setTimeout(() => setIsLoading(false), 500);
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  if (isLoading) {
    return null;
  } else {
    return (
      <>
        <div className={classes.container}>
          <h1>LOGO</h1>
        </div>
        {login ? (
          <FormLogin setUsuario={setUsuario} route="/recuperar-senha" usuario={usuario} />
        ) : usuario == 'profissional' ? (
          <FormProfissionalCadastro setUsuario={setUsuario} usuario={usuario} />
        ) : (
          <FormFornecedorCadastro setUsuario={setUsuario} usuario={usuario} />
        )}
        <div className={classes.container}>
          <p className={classes.changeLogin} onClick={() => setLogin(!login)}>
            {login ? 'Cadastre-se' : 'Login'}
          </p>
        </div>
      </>
    );
  }
}

export default AuthPage;
