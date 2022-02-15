import { useState } from 'react';

import classes from './formCadastro.module.scss';
import { signUp } from '../services/auth';
import { phone } from '../services/helpers';
import TrocarUsuario from './trocarUsuario';
import Button from './button';
import Input from './input';

function FormFornecedorCadastro({ setUsuario, usuario }) {
  const [nome, setNome] = useState('');
  const [descricaoProduto, setDescricaoProduto] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [siteEmpresa, setSiteEmpresa] = useState('');
  const [perfilInstagram, setPerfilInstagram] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();
    signUp(
      {
        nome,
        descricaoProduto,
        tipo: 'fornecedor',
        telefone,
        email,
        siteEmpresa,
        perfilInstagram,
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
      (nome == '' && descricaoProduto == '') ||
      telefone == '' ||
      siteEmpresa == '' ||
      perfilInstagram == ''
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
          placeholder="Descrição do produto"
          type="text"
          label="Descrição do produto"
          value={descricaoProduto}
          onChange={(event) => setDescricaoProduto(event.target.value)}
        />

        <div className={classes.flexInput}>
          <div style={{ padding: 0 }}>
            <Input
              placeholder="Telefone"
              type="text"
              label="Telefone"
              value={telefone}
              onChange={(event) => setTelefone(phone(event.target.value))}
            />
          </div>
          <div style={{ padding: 0, marginLeft: '10px' }}>
            <Input
              placeholder="E-mail"
              type="email"
              label="E-mail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        </div>
        <Input
          placeholder="Site da empresa"
          type="text"
          label="Site da empresa"
          value={siteEmpresa}
          onChange={(event) => setSiteEmpresa(event.target.value)}
        />
        <Input
          placeholder="Perfil Instagram"
          type="text"
          label="Perfil Instagram"
          value={siteEmpresa}
          onChange={(event) => setPerfilInstagram(event.target.value)}
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

export default FormFornecedorCadastro;
