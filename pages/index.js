import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { TryLocalSignin } from '../services/auth';
import FormLogin from '../components/formLogin';
import FormProfissionalCadastro from '../components/formProfissionalCadastro';
import FormFornecedorCadastro from '../components/formFornecedorCadastro';

import classes from './index.module.scss';
import TrocarUsuario from '../components/trocarUsuario';

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
          <FormLogin
            setUsuario={setUsuario}
            route={`/recuperar-senha/${usuario}`}
            usuario={usuario}
          >
            <TrocarUsuario setUsuario={setUsuario} usuario={usuario} />
          </FormLogin>
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
