import { useState } from 'react';
import { signUp } from '../../services/auth';

import classes from './formProfissionalCadastro.module.scss';
import { cpfMask, date } from '../../services/helpers';

function FormProfissionalCadastro({ setUsuario, usuario }) {
  const [nome, setNome] = useState('');
  const [nomeEscritorio, setNomeEscritorio] = useState('');
  const [dataDeNascimento, setDataDeNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();
    signUp(
      {
        nome,
        nomeEscritorio,
        dataDeNascimento,
        tipo: 'profissional',
        cpf,
        email,
        endereco,
        password,
      },
      setError,
      setMessage
    );
  };

  const isEnableSignUp = () => {
    return (
      email != '' &&
      password != '' &&
      nome != '' &&
      nomeEscritorio != '' &&
      dataDeNascimento != '' &&
      cpf != '' &&
      endereco != ''
    );
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.h1}>Cadastrar</h1>
      <div className={classes.buttonContainer}>
        <p
          className={`${classes.button} ${
            usuario == 'profissional' ? classes.selected : classes.unselected
          }`}
          onClick={() => setUsuario('profissional')}
        >
          Profissional
        </p>
        <p
          className={`${classes.button} ${
            usuario == 'fornecedor' ? classes.selected : classes.unselected
          }`}
          onClick={() => setUsuario('fornecedor')}
        >
          Fornecedor
        </p>
      </div>
      <form onSubmit={submitHandler}>
        <label htmlFor="nome">Nome</label>
        <div className={classes.containerInput}>
          <input
            placeholder="Nome"
            type="text"
            name="nome"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />
        </div>

        <label htmlFor="nomeEscritorio">Nome do Escritorio</label>
        <div className={classes.containerInput}>
          <input
            placeholder="Nome do Escritorio"
            type="text"
            name="nomeEscritorio"
            value={nomeEscritorio}
            onChange={(event) => setNomeEscritorio(event.target.value)}
          />
        </div>
        <div style={{ display: 'flex', padding: 0, justifyContent: 'space-between' }}>
          <div style={{ padding: 0 }}>
            <label htmlFor="dataDeNascimento">Data de Nascimento</label>
            <div className={classes.containerInput}>
              <input
                placeholder="Data de Nascimento"
                name="dataDeNascimento"
                onChange={(event) => {
                  setDataDeNascimento(date(event.target.value));
                }}
                value={dataDeNascimento}
              />
            </div>
          </div>
          <div style={{ padding: 0 }}>
            <label htmlFor="cpf">CPF</label>
            <div className={classes.containerInput}>
              <input
                placeholder="CPF"
                type="text"
                name="cpf"
                value={cpf}
                onChange={(event) => setCpf(cpfMask(event.target.value))}
              />
            </div>
          </div>
        </div>

        <label htmlFor="email">Email</label>
        <div className={classes.containerInput}>
          <input
            placeholder="Email"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <label htmlFor="endereco">Endereço</label>
        <div className={classes.containerInput}>
          <input
            placeholder="Endereço"
            type="string"
            name="endereco"
            value={endereco}
            onChange={(event) => setEndereco(event.target.value)}
          />
        </div>

        <label htmlFor="password">Senha</label>
        <div className={classes.containerInput}>
          <input
            placeholder="Password"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div style={{ justifyContent: 'flex-end' }} className={classes.buttonContainer}>
          <button
            className={`${classes.loginButton} ${
              isEnableSignUp() ? classes.loginButtonEnabled : classes.loginButtonDisabled
            }`}
            disabled={isEnableSignUp() ? false : true}
          >
            Cadastrar
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

export default FormProfissionalCadastro;
