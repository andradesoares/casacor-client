import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import FormLogin from '../../components/login/formLogin';
import FormFornecedorCadastro from '../../components/cadastro/formFornecedorCadastro';
import { TryLocalSignin } from '../../services/auth';
import classes from './index.module.css';

function AuthPage() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    TryLocalSignin(setIsLoading, router.push);
  }, []);

  if (isLoading) {
    return null;
  } else {
    return (
      <>
        <div>
          <div className={classes.container}>
            <button type="button" className={classes.toggle} onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Fazer Cadastro' : 'Fazer Login'}{' '}
            </button>
          </div>
        </div>
        {isLogin ? (
          <FormLogin route="/recuperar-senha" usuario={'fornecedor'} />
        ) : (
          <FormFornecedorCadastro />
        )}
      </>
    );
  }
}

export default AuthPage;
