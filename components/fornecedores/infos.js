import { useState } from 'react';
import api from '../../services/api';

import classes from './infos.module.scss';

import { phone } from '../../services/helpers';

function Infos({ usuario, setUsuario }) {
  const [editarPerfil, setEditarPerfil] = useState(false);
  const [nome, setNome] = useState(usuario.nome);
  const [descricaoProduto, setDescricaoProduto] = useState(usuario.descricaoProduto);
  const [telefone, setTelefone] = useState(usuario.telefone);
  const [siteEmpresa, setSiteEmpresa] = useState(usuario.siteEmpresa);
  const [perfilInstagram, setPerfilInstagram] = useState(usuario.perfilInstagram);

  const editarPerfilHandler = async (event) => {
    event.preventDefault();
    const response = await api.post(`/user/fornecedor/fornecedorUpdate`, {
      userId: usuario.fornecedor_userId,
      nome,
      descricaoProduto,
      telefone,
      siteEmpresa,
      perfilInstagram,
    });
    setEditarPerfil(false);
    setUsuario(response.data.usuario);
  };

  const cancelarEditarPerfil = async () => {
    setEditarPerfil(false);
    setNome(usuario.nome);
    setDescricaoProduto(usuario.descricaoProduto);
    setTelefone(usuario.telefone);
    setSiteEmpresa(usuario.siteEmpresa);
    setPerfilInstagram(usuario.perfilInstagram);
  };

  const isEnableSignUp = () => {
    return (
      nome != '' &&
      descricaoProduto != '' &&
      telefone != '' &&
      siteEmpresa != '' &&
      perfilInstagram != ''
    );
  };

  return (
    <>
      {editarPerfil ? (
        <div className={classes.container}>
          <form onSubmit={editarPerfilHandler}>
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
              <label className={classes.titulo} htmlFor="descricaoProduto">
                Descrição do Produto:
              </label>
              <div className={classes.containerInput}>
                <input
                  placeholder="Descrição do produto"
                  type="text"
                  name="descricaoProduto"
                  value={descricaoProduto}
                  onChange={(event) => setDescricaoProduto(event.target.value)}
                />
              </div>
            </div>
            <div className={classes.formContainer}>
              <label className={classes.titulo} htmlFor="telefone">
                Telefone:
              </label>
              <div className={classes.containerInput}>
                <input
                  placeholder="Telefone"
                  type="tel"
                  value={telefone}
                  name="telefone"
                  onChange={(event) => setTelefone(phone(event.target.value))}
                />
              </div>
            </div>
            <div className={classes.formContainer}>
              <label className={classes.titulo} htmlFor="site">
                Site da Empresa:
              </label>
              <div className={classes.containerInput}>
                <input
                  placeholder="Site da empresa"
                  type="text"
                  name="site"
                  value={siteEmpresa}
                  onChange={(event) => setSiteEmpresa(event.target.value)}
                />
              </div>
            </div>
            <div className={classes.formContainer}>
              <label className={classes.titulo} htmlFor="instagram">
                Perfil no Instagram:
              </label>
              <div className={classes.containerInput}>
                <input
                  placeholder="Perfil no Instagram"
                  type="text"
                  name="instagram"
                  value={siteEmpresa}
                  onChange={(event) => setPerfilInstagram(event.target.value)}
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
            <p className={classes.titulo}>Descrição do Produto:</p>
            <p>{descricaoProduto}</p>
          </div>
          <div className={classes.containerInfo}>
            {' '}
            <p className={classes.titulo}>Telefone:</p>
            <p>{telefone}</p>
          </div>
          <div className={classes.containerInfo}>
            {' '}
            <p className={classes.titulo}>Site da Empresa:</p>
            <p>{siteEmpresa}</p>
          </div>
          <div className={classes.containerInfo}>
            {' '}
            <p className={classes.titulo}>Perfil no Instagram:</p>
            <p>{perfilInstagram}</p>
          </div>
          <button
            style={{ marginTop: '30px' }}
            className={`${classes.button} ${classes.buttonEnabled}`}
            type="button"
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
