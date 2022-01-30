import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { TryLocalSignin, trocarSenha } from '../../../services/auth';

function RecuperSenha() {
  const { query } = useRouter();
  const router = useRouter();
  const { resetToken, userId } = query;
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    TryLocalSignin(setIsLoading, router.push);
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    trocarSenha('admin', password, userId, resetToken, setError);
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
          <div>{error}</div>
        </section>
      </>
    );
  }
}

export default RecuperSenha;
