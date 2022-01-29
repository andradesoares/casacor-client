import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn } from '../../services/auth';

function FormLogin({ usuario, route }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const submitHandler = async (event) => {
    event.preventDefault();
    signIn(email, password, usuario, router.push, setError);
  };

  return (
    <section>
      <h1>Login {usuario}</h1>
      <form onSubmit={submitHandler}>
        <div>
          <input
            placeholder="Email"
            type="email"
            id="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
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
            <button>Login</button>
          </div>
          <div>
            <Link href={route}>Esqueci Senha</Link>
          </div>
        </div>
      </form>
      <div>{error}</div>
    </section>
  );
}

export default FormLogin;
