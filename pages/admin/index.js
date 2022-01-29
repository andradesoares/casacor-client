import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import FormLogin from '../../components/login/formLoginAdmin';
import { TryLocalSignin } from '../../services/auth';

function AuthPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    TryLocalSignin(setIsLoading, router.push);
  }, []);

  const path = router.pathname.replace('/', '');

  if (isLoading) {
    return null;
  } else {
    return (
      <>
        <div>
          <div>
            <div type="button">Fazer Login</div>
          </div>
        </div>
        <FormLogin route="/admin/recuperar-senha" usuario={path} />
      </>
    );
  }
}

export default AuthPage;
