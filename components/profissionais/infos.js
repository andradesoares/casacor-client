import { useState } from 'react';
import api from '../../services/api';

import classes from './infos.module.scss';

import { cpfMask, date } from '../../services/helpers';

function Infos({ usuario, setUsuario }) {
  const [editarPerfil, setEditarPerfil] = useState(false);
  const [nome, setNome] = useState(usuario.nome);
  const [nomeEscritorio, setNomeEscritorio] = useState(usuario.nomeEscritorio);
  const [dataDeNascimento, setDataDeNascimento] = useState(usuario.datadeNascimento);
  const [cpf, setCpf] = useState(usuario.cpf);
  const [endereco, setEndereco] = useState(usuario.endereco);

  const editarPerfilHandler = async (event) => {
    const response = await api.post(`/user/profissional/profissionalUpdate`, {
      userId: usuario.profissional_userId,
      nome,
      nomeEscritorio,
      dataDeNascimento,
      cpf,
      endereco,
    });
    setEditarPerfil(false);
    setUsuario(response.data.usuario);
  };

  const cancelarEditarPerfil = async () => {
    setEditarPerfil(false);
    setNome(usuario.nome);
    setNomeEscritorio(usuario.nomeEscritorio);
    setDataDeNascimento(usuario.datadeNascimento);
    setCpf(usuario.cpf);
  };

  const isEnableSignUp = () => {
    return (
      nome != '' && nomeEscritorio != '' && dataDeNascimento != '' && cpf != '' && endereco != ''
    );
  };

  return (
    <>
      {editarPerfil ? (
        <div className={classes.container}>
          <form>
            <div className={classes.formContainer}>
              <label className={classes.titulo} htmlFor="nome">
                Nome:
              </label>
              <div className={classes.containerInput}>
                <input
                  placeholder="Nome"
                  type="text"
                  name="nome"
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                />
              </div>
            </div>
            <div className={classes.formContainer}>
              <label className={classes.titulo} htmlFor="escritorio">
                Nome do Escritório:
              </label>
              <div className={classes.containerInput}>
                <input
                  placeholder="Nome Escritório"
                  type="text"
                  name="escritorio"
                  value={nomeEscritorio}
                  onChange={(event) => setNomeEscritorio(event.target.value)}
                />
              </div>
            </div>
            <div className={classes.formContainer}>
              <label className={classes.titulo} htmlFor="nascimento">
                Data de Nascimento:
              </label>
              <div className={classes.containerInput}>
                <input
                  placeholder="Data de Nascimento"
                  name="nascimento"
                  value={dataDeNascimento}
                  onChange={(event) => setDataDeNascimento(date(event.target.value))}
                />
              </div>
            </div>
            <div className={classes.formContainer}>
              <label className={classes.titulo} htmlFor="cpf">
                CPF:
              </label>
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
            <div className={classes.formContainer}>
              <label className={classes.titulo} htmlFor="endereco">
                Endereço:
              </label>
              <div className={classes.containerInput}>
                <input
                  placeholder="Endereço"
                  type="text"
                  name="endereco"
                  value={endereco}
                  onChange={(event) => setEndereco(event.target.value)}
                />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
              <div>
                <button
                  onClick={editarPerfilHandler}
                  className={`${classes.button} ${
                    isEnableSignUp() ? classes.buttonEnabled : classes.buttonDisabled
                  }`}
                  disabled={isEnableSignUp() ? false : true}
                >
                  Salvar
                </button>
              </div>
              <div>
                <button
                  className={`${classes.button} ${classes.buttonEnabled}`}
                  onClick={cancelarEditarPerfil}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className={classes.container}>
          <div className={classes.containerInfo}>
            {' '}
            <p className={classes.titulo}>Nome:</p>
            <p>{nome}</p>
          </div>
          <div className={classes.containerInfo}>
            {' '}
            <p className={classes.titulo}>Nome do Escritório:</p>
            <p>{nomeEscritorio}</p>
          </div>
          <div className={classes.containerInfo}>
            {' '}
            <p className={classes.titulo}>Data de Nascimento:</p>
            <p>{dataDeNascimento}</p>
          </div>
          <div className={classes.containerInfo}>
            {' '}
            <p className={classes.titulo}>CPF:</p>
            <p>{cpf}</p>
          </div>
          <div className={classes.containerInfo}>
            {' '}
            <p className={classes.titulo}>Endereço:</p>
            <p>{endereco}</p>
          </div>
          <button
            style={{ marginTop: '30px' }}
            className={`${classes.button} ${classes.buttonEnabled}`}
            onClick={() => {
              setEditarPerfil(true);
            }}
          >
            Editar
          </button>
        </div>
      )}
    </>
  );
}

export default Infos;
