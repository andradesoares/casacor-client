import { useState } from 'react';
import Link from 'next/link';

import { requisitarNovaSenha } from '../services/auth';
import classes from './formRequisicao.module.scss';
import Button from './button';
import Input from './input';

function FormEsqueciSenha({ usuario, route }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();
    requisitarNovaSenha(email, usuario, setError, setMessage);
  };

  const disabledButton = () => {
    return email == '';
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.h1}>Solicitar recuperação de senha</h1>
      <form>
        <Input
          placeholder="E-mail"
          type="email"
          label="E-mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <div style={{ justifyContent: 'space-between' }} className={classes.buttonContainer}>
          <Link className={classes.esqueciButton} href={route}>
            Login
          </Link>
          <Button disabled={disabledButton()} onClick={submitHandler} label="Enviar" />
        </div>
      </form>
      <div>
        {error}
        {message}
      </div>
    </div>
  );
}

export default FormEsqueciSenha;
