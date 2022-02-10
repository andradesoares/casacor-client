import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import FormEsqueciSenha from '../../components/formRequisicao';
import { TryLocalSignin } from '../../services/auth';

function RecuperSenha() {
  const router = useRouter();
  const { usuario } = router.query;

  const [isLoading, setIsLoading] = useState(true);

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
        <section>
          <div>
            <FormEsqueciSenha usuario={usuario} route={usuario == 'admin' ? '/admin' : '/'} />
          </div>
        </section>
      </>
    );
  }
}

export default RecuperSenha;
