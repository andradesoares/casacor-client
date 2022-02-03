import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { signIn } from '../../services/auth';

import classes from './formLogin.module.scss';
import eye_close from '../../images/icons/eye_close.png';
import eye from '../../images/icons/eye.png';

function FormLogin({ usuario, route }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  const router = useRouter();

  const submitHandler = async (event) => {
    event.preventDefault();
    signIn(email, password, usuario, router.push, setError);
  };

  const isEnableSignUp = () => {
    return email != '' && password != '';
  };

  return (
    <div style={{ minWidth: '392px' }} className={classes.container}>
      <h1 className={classes.h1}>Entrar</h1>
      <form onSubmit={submitHandler}>
        {' '}
        <label style={{ textTransform: 'upperCase' }} htmlFor="email">
          Email
        </label>
        <div className={classes.containerInput}>
          <input
            placeholder="Seu e-mail"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>{' '}
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
          <div style={{ padding: '0', display: 'flex', alignItems: 'center', marginRight: '5px' }}>
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
        <div style={{ justifyContent: 'space-between' }} className={classes.buttonContainer}>
          <Link className={classes.esqueciButton} href={route}>
            Esqueci Senha
          </Link>
          <button
            className={`${classes.loginButton} ${
              isEnableSignUp() ? classes.loginButtonEnabled : classes.loginButtonDisabled
            }`}
            disabled={isEnableSignUp() ? false : true}
          >
            Login
          </button>
        </div>
      </form>
      <div>{error}</div>
    </div>
  );
}

export default FormLogin;
