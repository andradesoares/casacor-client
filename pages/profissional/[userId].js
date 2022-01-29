import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import api from '../../services/api';
import Infos from '../../components/profissionais/infos';
import Fornecedores from '../../components/profissionais/fornecedores';
import Ambiente from '../../components/profissionais/ambiente';
import { signOut } from '../../services/auth';

function Home() {
  const [usuario, setUsuario] = useState([]);
  const [fornecedoresAdicionados, setFornecedoresAdicionados] = useState([]);
  const [fornecedoresNaoAdicionados, setFornecedoresNaoAdicionados] = useState([]);
  const [display, setDisplay] = useState('home');
  const [ambiente, setAmbiente] = useState('');
  const router = useRouter();
  const { userId } = router.query;

  useEffect(() => {
    if (Object.keys(router.query).length > 0) {
      usuarioLogado(userId);
      getProfissionais(userId);
    }
  }, [router.query]);

  const usuarioLogado = async (term) => {
    const response = await api.post(`/profissional/lerUsuario`, {
      profissionalId: term,
    });
    setUsuario(response.data.usuario);
    setAmbiente(response.data.usuario.Ambiente);
  };

  const getProfissionais = async (userId) => {
    const response = await api.get(`/profissional/lerConexoes`, {
      params: {
        profissionalId: userId,
      },
    });
    setFornecedoresAdicionados(response.data.fornecedoresAdicionados);
    setFornecedoresNaoAdicionados(response.data.fornecedoresNaoAdicionados);
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
              setDisplay('fornecedores');
            }}
          >
            Fornecedores
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
              setDisplay('ambiente');
            }}
          >
            Ambiente
          </button>
        </div>
        {display == 'home' && usuario.nome !== undefined ? (
          <Infos usuario={usuario} setUsuario={setUsuario} />
        ) : null}

        {display == 'fornecedores' ? (
          <Fornecedores
            setStateFornecedoresAdicionados={setFornecedoresAdicionados}
            setStateFornecedoresNaoAdicionados={setFornecedoresNaoAdicionados}
            fornecedoresAdicionados={fornecedoresAdicionados}
            fornecedoresNaoAdicionados={fornecedoresNaoAdicionados}
          />
        ) : null}
        {display == 'ambiente' ? (
          <Ambiente setAmbiente={setAmbiente} ambiente={ambiente} userId={userId} />
        ) : null}
      </div>
    </>
  );
}

export default Home;
