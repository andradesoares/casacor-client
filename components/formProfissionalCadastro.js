import { useState } from 'react';

import classes from './formCadastro.module.scss';
import { signUp } from '../services/auth';
import { cpfMask, date } from '../services/helpers';
import TrocarUsuario from './trocarUsuario';
import Button from './button';
import Input from './input';

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

  const disabledButton = () => {
    return (
      email == '' ||
      password == '' ||
      nome == '' ||
      nomeEscritorio == '' ||
      dataDeNascimento == '' ||
      cpf == '' ||
      endereco == ''
    );
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.h1}>Cadastrar</h1>
      <TrocarUsuario setUsuario={setUsuario} usuario={usuario} />
      <form>
        <Input
          placeholder="Nome"
          type="text"
          label="Nome"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
        />
        <Input
          placeholder="Nome do Escritorio"
          type="text"
          label="Nome do Escritorio"
          value={nomeEscritorio}
          onChange={(event) => setNomeEscritorio(event.target.value)}
        />
        <div className={classes.flexInput}>
          <div style={{ padding: 0 }}>
            <Input
              placeholder="Data de Nascimento"
              label="Data de Nascimento"
              onChange={(event) => {
                setDataDeNascimento(date(event.target.value));
              }}
              value={dataDeNascimento}
            />
          </div>
          <div style={{ padding: 0, marginLeft: '10px' }}>
            <Input
              placeholder="CPF"
              label="CPF"
              type="text"
              value={cpf}
              onChange={(event) => setCpf(cpfMask(event.target.value))}
            />
          </div>
        </div>
        <Input
          placeholder="E-mail"
          type="email"
          label="E-mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          placeholder="Endereço"
          type="text"
          label="Endereço"
          value={endereco}
          onChange={(event) => setEndereco(event.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          label="Senha"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <div style={{ justifyContent: 'flex-end' }} className={classes.buttonContainer}>
          <Button disabled={disabledButton()} onClick={submitHandler} label="Cadastrar" />
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
