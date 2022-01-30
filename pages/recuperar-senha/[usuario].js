import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import FormEsqueciSenha from '../../components/esqueciASenha/formRequisicao';
import { TryLocalSignin } from '../../services/auth';

function RecuperSenha() {
  const router = useRouter();
  const { usuario } = router.query;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    TryLocalSignin(setIsLoading, router.push);
  }, []);

  if (isLoading) {
    return null;
  } else {
    return (
      <>
        <section>
          <div>
            <FormEsqueciSenha usuario={usuario} />
          </div>
        </section>
      </>
    );
  }
}

export default RecuperSenha;
