import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import FormLogin from '../../components/formLogin';
import { TryLocalSignin } from '../../services/auth';

import classes from './index.module.scss';

function AuthPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const path = router.pathname.replace('/', '');

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
        <FormLogin route="/admin/recuperar-senha" usuario={path} />
      </>
    );
  }
}

export default AuthPage;
