import { useState } from 'react';
import api from '../../services/api';

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

  return (
    <>
      <h3>Admins</h3>
      {admins.map((admin) => (
        <div key={admin.email} style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ minWidth: '300px', paddingRight: '50px' }}>
            <p>{admin.nome}</p>
          </div>
          <div style={{ minWidth: '300px', paddingRight: '50px' }}>
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
          <div
            onClick={() => {
              excluirAdmin(admin.admin_userId);
            }}
          >
            <button>Excluir</button>
          </div>
          <div
            onClick={() => {
              excluirAdmin(admin.admin_userId);
            }}
          >
            <button>Editar</button>
          </div>
        </div>
      ))}
      {adicionar && (
        <form onSubmit={criarUsuarioHandler}>
          <div style={{ display: 'flex' }}>
            <div style={{ minWidth: '300px', paddingRight: '50px' }}>
              <input
                placeholder="Nome"
                value={nome}
                type="text"
                id="nome"
                required
                onChange={(event) => setNome(event.target.value)}
              />
            </div>
            <div style={{ minWidth: '300px', paddingRight: '50px' }}>
              <input
                placeholder="Email"
                value={email}
                type="email"
                id="email"
                required
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div>
              <select value={tipo} onChange={handleChange}>
                <option value="basico">Básico</option>
                <option value="pleno">Pleno</option>
              </select>
            </div>
            <div>
              <button>Salvar</button>
            </div>
            <div>
              <button onClick={cancelarEditarPerfil}>Cancelar</button>
            </div>
          </div>
        </form>
      )}
      <div>
        <button
          onClick={() => {
            setAdicionar(true);
          }}
        >
          Adicionar
        </button>
      </div>
      <div>{error}</div>
    </>
  );
};

export default Admins;
