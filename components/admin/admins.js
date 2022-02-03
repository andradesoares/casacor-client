import { useState } from 'react';
import api from '../../services/api';

import classes from './admins.module.scss';

const Admins = ({ adminId, admins, setAdmins }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [editarPerfil, setEditarPerfil] = useState(false);
  const [tipo, setTipo] = useState('basico');
  const [adicionar, setAdicionar] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setTipo(event.target.value);
  };

  const criarUsuarioHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post(`/user/admin/signup`, {
        admin_userId: adminId,
        nome: nome,
        email: email,
        tipo: tipo,
      });

      setAdmins([
        ...admins,
        { admin_userId: response.data.userId, nome: nome, email: email, tipo: tipo },
      ]);
      setAdicionar(false);
      setNome('');
      setEmail('');
      setTipo('basico');
      setError('');
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const excluirAdmin = async (admin_id) => {
    await api.post(`/admin/excluirAdmin`, {
      admin_userId: admin_id,
    });
    setAdmins(admins.filter((admin) => admin.admin_userId !== admin_id));
  };

  const cancelarEditarPerfil = async () => {
    setAdicionar(false);
    setNome('');
    setEmail('');
    setTipo('basico');
  };

  const editarAdmin = async (event) => {
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

  const isEnableSignUp = () => {
    return nome != '' && email != '';
  };

  return (
    <>
      <h3>Admins</h3>
      {admins.map((admin) => (
        <div key={admin.email} style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ minWidth: '30%', paddingRight: '50px' }}>
            <p>{admin.nome}</p>
          </div>
          <div style={{ minWidth: '30%', paddingRight: '50px' }}>
            <p>{admin.email}</p>
          </div>
          <div>
            <p>{admin.tipo}</p>
            {/* <select value={admin.tipo} onChange={handleChange}>
              <option value="basico">Básico</option>
              <option value="intermediario">Intermediário</option>
              <option value="pleno">Pleno</option>
            </select> */}
          </div>
          <div>
            <button
              className={classes.downloadButton}
              onClick={() => {
                excluirAdmin(admin.admin_userId);
              }}
            >
              Excluir
            </button>
          </div>
          {/* <div
            onClick={() => {
              excluirAdmin(admin.admin_userId);
            }}
          >
            <button>Editar</button>
          </div> */}
        </div>
      ))}
      {adicionar && (
        <form onSubmit={criarUsuarioHandler}>
          <div style={{ display: 'flex', alignItems: 'flex-end', minWidth: '100%' }}>
            <div style={{ minWidth: '33%' }}>
              <label style={{ textTransform: 'upperCase' }} htmlFor="Nome">
                Nome
              </label>{' '}
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
            </div>
            <div style={{ minWidth: '33%' }}>
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
              </div>
            </div>
            <div
              className={classes.containerInput}
              style={{ marginBottom: '10px', maxHeight: '35px', marginLeft: '10px' }}
            >
              <select value={tipo} onChange={handleChange}>
                <option value="basico">Básico</option>
                <option value="pleno">Pleno</option>
              </select>
            </div>
          </div>
        </form>
      )}
      {adicionar ? (
        <>
          <div style={{ display: 'flex', padding: '0' }}>
            <div>
              <button
                className={`${classes.salvarButton} ${
                  isEnableSignUp() ? classes.salvarButtonEnabled : classes.salvarButtonDisabled
                }`}
                disabled={isEnableSignUp() ? false : true}
              >
                Salvar
              </button>
            </div>
            <div>
              <button className={classes.downloadButton} onClick={cancelarEditarPerfil}>
                Cancelar
              </button>
            </div>
          </div>
        </>
      ) : (
        <div>
          <button
            className={classes.downloadButton}
            onClick={() => {
              setAdicionar(true);
            }}
          >
            Adicionar
          </button>
        </div>
      )}
      <div>{error}</div>
    </>
  );
};

export default Admins;
