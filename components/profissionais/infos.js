import { useState } from 'react';
import api from '../../services/api';

function Infos({ usuario, setUsuario }) {
  const [editarPerfil, setEditarPerfil] = useState(false);
  const [nome, setNome] = useState(usuario.nome);
  const [nomeEscritorio, setNomeEscritorio] = useState(usuario.nomeEscritorio);
  const [dataDeNascimento, setDataDeNascimento] = useState(usuario.dataDeNascimento);
  const [cpf, setCpf] = useState(usuario.cpf);
  const [endereco, setEndereco] = useState(usuario.endereco);
  const [nomeResponsavelObra, setNomeResponsavelObra] = useState(usuario.nomeResponsavelObra);
  const [telefoneResponsavelObra, setTelefoneResponsavelObra] = useState(
    usuario.telefoneResponsavelObra
  );
  const [emailResponsavelObra, setEmailResponsavelObra] = useState(usuario.emailResponsavelObra);

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
    setNomeEscritorio(usuario.nomeEscritorio);
    setDataDeNascimento(usuario.dataDeNascimento);
    setCpf(usuario.cpf);
    setEndereco(usuario.endereco);
    setNomeResponsavelObra(usuario.nomeResponsavelObra);
    setTelefoneResponsavelObra(usuario.telefoneResponsavelObra);
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
                placeholder="Nome Escritório"
                type="text"
                required
                value={nomeEscritorio}
                onChange={(event) => setNomeEscritorio(event.target.value)}
              />
            </div>
            <div>
              <input
                placeholder="Data de Nascimento"
                type="date"
                required
                value={dataDeNascimento}
                onChange={(event) => setDataDeNascimento(event.target.value)}
              />
            </div>

            <div>
              <input
                placeholder="CPF"
                type="text"
                required
                value={cpf}
                onChange={(event) => setCpf(event.target.value)}
              />
            </div>
            <div>
              <input
                placeholder="Endereço"
                type="text"
                required
                value={endereco}
                onChange={(event) => setEndereco(event.target.value)}
              />
            </div>
            <div>
              <input
                placeholder="Nome Responsável Pela Obra"
                type="text"
                required
                value={nomeResponsavelObra}
                onChange={(event) => setNomeResponsavelObra(event.target.value)}
              />
            </div>
            <div>
              <input
                placeholder="Telefone Pela Obra"
                type="tel"
                required
                value={telefoneResponsavelObra}
                onChange={(event) => setTelefoneResponsavelObra(event.target.value)}
              />
            </div>
            <div>
              <input
                placeholder="Email Responsável Pela Obra"
                type="text"
                required
                value={emailResponsavelObra}
                onChange={(event) => setEmailResponsavelObra(event.target.value)}
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
          <div>{nomeEscritorio}</div>
          <div>{dataDeNascimento}</div>
          <div>{cpf}</div>
          <div>{endereco}</div>
          <div>{nomeResponsavelObra}</div>
          <div>{telefoneResponsavelObra}</div>
          <div>{emailResponsavelObra}</div>
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
