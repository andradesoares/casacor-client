import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { TryLocalSignin } from '../services/auth';

function AuthPage() {
  const router = useRouter();
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
        <div>
          {isLoading}
          <div>
            <Link href="/fornecedor">
              <a style={{ margin: '10px' }}>Fornecedor</a>
            </Link>
            <Link href="/profissional">
              <a style={{ margin: '10px' }}>Profissional</a>
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default AuthPage;
