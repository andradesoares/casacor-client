import { useState } from 'react';
import api from '../../services/api';

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

  return (
    <>
      {editarPerfil ? (
        <div>
          <form onSubmit={editarPerfilHandler}>
            <div>
              <input
                placeholder="Nome"
                type="text"
                id="nome"
                required
                value={nome}
                onChange={(event) => setNome(event.target.value)}
              />
            </div>
            <div>
              <input
                placeholder="Descrição do produto"
                type="text"
                id="descricaoProduto"
                required
                value={descricaoProduto}
                onChange={(event) => setDescricaoProduto(event.target.value)}
              />
            </div>
            <div>
              <input
                placeholder="Telefone"
                type="tel"
                required
                value={telefone}
                onChange={(event) => setTelefone(event.target.value)}
              />
            </div>

            <div>
              <input
                placeholder="Site da empresa"
                type="text"
                required
                value={siteEmpresa}
                onChange={(event) => setSiteEmpresa(event.target.value)}
              />
            </div>
            <div>
              <input
                placeholder="Perfil Instagram"
                type="text"
                required
                value={perfilInstagram}
                onChange={(event) => setPerfilInstagram(event.target.value)}
              />
            </div>
            <div>
              <button>Salvar</button>
            </div>
            <div>
              <button onClick={cancelarEditarPerfil}>Cancelar</button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <div>{nome}</div>
          <div>{descricaoProduto}</div>
          <div>{telefone}</div>
          <div>{siteEmpresa}</div>
          <div>{perfilInstagram}</div>
          <button
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
