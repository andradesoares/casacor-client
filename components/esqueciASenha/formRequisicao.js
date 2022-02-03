import { useState, useContext } from 'react';
import Link from 'next/link';
import { requisitarNovaSenha } from '../../services/auth';

import classes from './formRequisicao.module.scss';

function FormEsqueciSenha({ usuario }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();
    requisitarNovaSenha(email, usuario, setError, setMessage);
  };

  const isEnableSignUp = () => {
    return email != '';
  };

  return (
    <div style={{ minWidth: '392px' }} className={classes.container}>
      <h1 className={classes.h1}>Solicitar recuperação de senha</h1>
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
        <div
          style={{ justifyContent: 'space-between', paddingTop: '0' }}
          className={classes.buttonContainer}
        >
          <div style={{ justifyContent: 'space-between' }} className={classes.buttonContainer}>
            <Link className={classes.esqueciButton} href={`/`}>
              Login
            </Link>
          </div>
          <button
            className={`${classes.loginButton} ${
              isEnableSignUp() ? classes.loginButtonEnabled : classes.loginButtonDisabled
            }`}
            disabled={isEnableSignUp() ? false : true}
          >
            Enviar
          </button>
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
