import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { TryLocalSignin, trocarSenha } from '../../../services/auth';
import Link from 'next/link';

function RecuperSenha() {
  const { query } = useRouter();
  const router = useRouter();
  const { resetToken, userId } = query;
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    TryLocalSignin(router.push);

    let timer1 = setTimeout(() => setIsLoading(false), 500);
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    trocarSenha('admin', password, userId, resetToken, setError, setMessage);
  };

  if (isLoading) {
    return null;
  } else {
    return (
      <>
        <section>
          <form onSubmit={submitHandler}>
            <div>
              <input
                placeholder="Password"
                type="password"
                id="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div>
              <div>
                <button>Enviar</button>
              </div>
            </div>
          </form>
          <div>
            {error ? error : null}
            {message ? (
              <>
                {message}{' '}
                <Link href="/admin">
                  <a style={{ margin: '10px' }}> Profissional</a>
                </Link>{' '}
              </>
            ) : null}
          </div>
        </section>
      </>
    );
  }
}

export default RecuperSenha;
