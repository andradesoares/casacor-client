import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import FormLogin from '../../components/login/formLogin';
import FormProfissionalCadastro from '../../components/cadastro/formProfissionalCadastro';
import { TryLocalSignin } from '../../services/auth';

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
          <div>
            <button type="button" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Fazer Cadastro' : 'Fazer Login'}{' '}
            </button>
          </div>
        </div>
        {isLogin ? (
          <FormLogin route="/recuperar-senha" usuario={'profissional'} />
        ) : (
          <FormProfissionalCadastro />
        )}
      </>
    );
  }
}

export default AuthPage;
