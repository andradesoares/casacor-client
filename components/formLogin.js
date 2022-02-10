import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { signIn } from '../services/auth';

import classes from './formLogin.module.scss';
import eye_close from '../images/icons/eye_close.png';
import eye from '../images/icons/eye.png';
import Input from './input';
import Button from './button';

function FormLogin({ usuario, children, route }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  const router = useRouter();

  const submitHandler = async (event) => {
    event.preventDefault();
    signIn(email, password, usuario, router.push, setError);
  };

  const disabledButton = () => {
    return email == '' || password == '';
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.h1}>Entrar</h1>
      {children}
      <form>
        <Input
          onChange={(event) => setEmail(event.target.value)}
          label="E-mail"
          type="email"
          placeholder="Seu email"
          value={email}
        />
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
          <Button disabled={disabledButton()} onClick={submitHandler} label="Login" />
        </div>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
}

export default FormLogin;
