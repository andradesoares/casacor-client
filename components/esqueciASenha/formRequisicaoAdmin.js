import { useState } from 'react';
import Link from 'next/link';
import { requisitarNovaSenha } from '../../services/auth';

function FormEsqueciSenha({ usuario }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();
    requisitarNovaSenha(email, usuario, setError);
  };

  return (
    <section>
      <h1>Solicitar recuperação de senha</h1>
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
          <div>
            <button>Solicitar Requisicao</button>
          </div>
          <div>
            <Link href={'/admin'}>Login</Link>
          </div>
        </div>
      </form>
      <div>{error}</div>
    </section>
  );
}

export default FormEsqueciSenha;
