import { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import FormEsqueciSenha from '../../../components/esqueciASenha/formRequisicaoAdmin';
import { TryLocalSignin } from '../../../services/auth';

function RecuperSenha() {
  const router = useRouter();

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
            <Link href={`/admin`}>Login</Link>
            <FormEsqueciSenha usuario={'admin'} />
          </div>
        </section>
      </>
    );
  }
}

export default RecuperSenha;
