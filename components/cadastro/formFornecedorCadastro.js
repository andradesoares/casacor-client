import { useState } from 'react';
import { signUp } from '../../services/auth';

import classes from './formFornecedorCadastro.module.scss';
import { phone } from '../../services/helpers';

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

  const isEnableSignUp = () => {
    return (
      email != '' &&
      password != '' &&
      nome != '' &&
      descricaoProduto != '' &&
      telefone != '' &&
      siteEmpresa != '' &&
      perfilInstagram != ''
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
            name="nome"
            type="text"
            id="nome"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />
        </div>
        <label htmlFor="descricaoProduto">Descrição do produto</label>
        <div className={classes.containerInput}>
          <input
            nome="descricaoProduto"
            placeholder="Descrição do produto"
            type="text"
            id="descricaoProduto"
            value={descricaoProduto}
            onChange={(event) => setDescricaoProduto(event.target.value)}
          />
        </div>
        <div style={{ display: 'flex', padding: 0, justifyContent: 'space-between' }}>
          <div style={{ padding: 0 }}>
            <label htmlFor="telefone">Telefone</label>
            <div className={classes.containerInput}>
              <input
                placeholder="Telefone"
                nome="telefone"
                type="text"
                value={telefone}
                onChange={(event) => setTelefone(phone(event.target.value))}
              />
            </div>
          </div>
          <div style={{ padding: 0 }}>
            <label htmlFor="email">E-mail</label>
            <div className={classes.containerInput}>
              <input
                placeholder="Email"
                type="email"
                nome="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>
        </div>

        <label htmlFor="siteDaEmpresa">Site da empresa</label>
        <div className={classes.containerInput}>
          <input
            placeholder="Site da empresa"
            type="text"
            nome="siteDaEmpresa"
            value={siteEmpresa}
            onChange={(event) => setSiteEmpresa(event.target.value)}
          />
        </div>
        <label htmlFor="perfilInstagram">Perfil Instagram</label>
        <div className={classes.containerInput}>
          <input
            placeholder="Perfil Instagram"
            type="text"
            nome="perfilInstagram"
            value={perfilInstagram}
            onChange={(event) => setPerfilInstagram(event.target.value)}
          />
        </div>
        <label htmlFor="password">Senha</label>
        <div className={classes.containerInput}>
          <input
            placeholder="Password"
            type="password"
            nome="password"
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

export default FormFornecedorCadastro;
