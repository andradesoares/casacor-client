import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { TryLocalSignin } from '../../services/auth';
import { trocarSenha } from '../../services/auth';

function RecuperSenha() {
  const { query } = useRouter();
  const { tipo, resetToken, userId } = query;
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const submitHandler = async (event) => {
    event.preventDefault();
    trocarSenha(tipo, password, userId, resetToken, setError, setMessage);
  };

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
            {error}
            {message ? (
              <>
                {message}{' '}
                <Link href={`/${tipo}`}>
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
