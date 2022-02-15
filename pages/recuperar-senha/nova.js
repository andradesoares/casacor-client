import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import { TryLocalSignin, trocarSenha } from '../../services/auth';
import eye_close from '../../images/icons/eye_close.png';
import eye from '../../images/icons/eye.png';
import Button from '../../components/button';

import classes from './nova.module.scss';

function RecuperSenha() {
  const router = useRouter();

  const { query } = useRouter();
  const { tipo, resetToken, userId } = query;
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
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

  const disabledButton = () => {
    return password == '';
  };

  if (isLoading) {
    return null;
  } else {
    return (
      <>
        <div className={classes.container}>
          <h1 className={classes.h1}>Cadastrar nova senha</h1>
          <form>
            {' '}
            <label style={{ textTransform: 'upperCase' }} htmlFor="password">
              Senha
            </label>
            <div className={classes.containerInput}>
              <input
                placeholder="Sua senha"
                type={showPass ? 'text' : 'password'}
                id="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              ></input>{' '}
              <div
                style={{ padding: '0', display: 'flex', alignItems: 'center', marginRight: '5px' }}
              >
                <Image
                  className={classes.imagePassword}
                  onClick={() => setShowPass(!showPass)}
                  src={showPass ? eye_close : eye}
                  alt="Mostrar senha"
                  width={15}
                  height={15}
                />
              </div>
            </div>
            <div
              style={{ justifyContent: 'flex-end', paddingTop: '0' }}
              className={classes.buttonContainer}
            >
              <Button disabled={disabledButton()} onClick={submitHandler} label="Enviar"></Button>
            </div>
          </form>
          <div>
            {error}
            {message ? (
              <>
                {message}{' '}
                <Link href={`/${tipo}`}>
                  <a style={{ margin: '10px' }}>{tipo}</a>
                </Link>{' '}
              </>
            ) : null}
          </div>
        </div>
      </>
    );
  }
}

export default RecuperSenha;
