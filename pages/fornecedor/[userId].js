import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../../services/api';
import Infos from '../../components/fornecedores/infos';
import Profissionais from '../../components/fornecedores/profissionais';
import Arquivos from '../../components/fornecedores/arquivos';
import { signOut } from '../../services/auth';

function Home() {
  const [usuario, setUsuario] = useState([]);
  const [profissionaisAdicionados, setProfissionaisAdicionados] = useState([]);
  const [profissionaisNaoAdicionados, setProfissionaisNaoAdicionados] = useState([]);
  const [display, setDisplay] = useState('home');
  const [logo, setLogo] = useState('');
  const router = useRouter();
  const { userId } = router.query;

  useEffect(() => {
    if (Object.keys(router.query).length > 0) {
      usuarioLogado(userId);
      getProfissionais(userId);
    }
  }, [router.query]);

  const usuarioLogado = async (term) => {
    const response = await api.post(`/fornecedor/lerUsuario`, {
      fornecedorId: term,
    });
    setUsuario(response.data.usuario);
    setLogo(response.data.usuario.logo);
  };

  const getProfissionais = async (userId) => {
    const response = await api.get(`/fornecedor/lerConexoes`, {
      params: {
        fornecedorId: userId,
      },
    });
    setProfissionaisAdicionados(response.data.profissionaisAdicionados);
    setProfissionaisNaoAdicionados(response.data.profissionaisNaoAdicionados);
  };

  return (
    <>
      <div>
        <div>
          <button
            type="button"
            onClick={() => {
              setDisplay('home');
            }}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => {
              setDisplay('profissionais');
            }}
          >
            Profissionais
          </button>
          <button
            type="button"
            onClick={() => {
              signOut(router.push);
            }}
          >
            Logout
          </button>
          <button
            type="button"
            onClick={() => {
              setDisplay('arquivos');
            }}
          >
            Arquivos
          </button>
        </div>
        {display == 'home' && usuario.nome !== undefined ? (
          <Infos usuario={usuario} setUsuario={setUsuario} />
        ) : null}

        {display == 'profissionais' ? (
          <Profissionais
            setStateProfissionaisAdicionados={setProfissionaisAdicionados}
            setStateProfissionaisNaoAdicionados={setProfissionaisNaoAdicionados}
            profissionaisAdicionados={profissionaisAdicionados}
            profissionaisNaoAdicionados={profissionaisNaoAdicionados}
          />
        ) : null}
        {display == 'arquivos' ? (
          <Arquivos userId={userId} nome={usuario.nome} logo={logo} setLogo={setLogo} />
        ) : null}
      </div>
    </>
  );
}

export default Home;
