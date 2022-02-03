import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../../services/api';
import Infos from '../../components/profissionais/infos';
import Fornecedores from '../../components/profissionais/fornecedores';
import Arquivos from '../../components/profissionais/arquivos';
import Ambiente from '../../components/profissionais/ambiente';
import PaginaPrincipal from '../../components/profissionais/home';
import NavBar from '../../components/layout/navbar';
import MenuLateral from '../../components/layout/menuLateral';
import ItemMenuLateral from '../../components/layout/itemMenuLateral';

import classes from './user.module.scss';

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [usuario, setUsuario] = useState([]);
  const [fornecedoresAdicionados, setFornecedoresAdicionados] = useState([]);
  const [fornecedoresNaoAdicionados, setFornecedoresNaoAdicionados] = useState([]);
  const [display, setDisplay] = useState('home');
  const [ambiente, setAmbiente] = useState('');
  const [logo, setLogo] = useState('');

  const router = useRouter();
  const { userId } = router.query;

  useEffect(() => {
    if (Object.keys(router.query).length > 0) {
      usuarioLogado(userId);
      getProfissionais(userId);

      const token = localStorage.getItem('signIntoken');
      const userIdLocal = localStorage.getItem('userId');
      const tipoLocal = localStorage.getItem('tipo');

      if (!token || !userIdLocal || !tipoLocal) {
        router.push(`/`);
      }
    }

    let timer1 = setTimeout(() => setIsLoading(false), 500);
    return () => {
      clearTimeout(timer1);
    };
  }, [router.query]);

  const usuarioLogado = async (term) => {
    const response = await api.post(`/profissional/lerUsuario`, {
      profissionalId: term,
    });
    setUsuario(response.data.usuario);
    setAmbiente(response.data.usuario.Ambiente);
    setLogo(response.data.usuario.logo);
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

  if (isLoading) {
    return null;
  } else {
    return (
      <>
        <NavBar usuario={usuario} tipo={localStorage.getItem('tipo')} />
        <MenuLateral>
          <ItemMenuLateral
            setDisplay={setDisplay}
            style={{
              borderBottom: '1px solid black',
            }}
            item="home"
          />{' '}
          <ItemMenuLateral
            setDisplay={setDisplay}
            style={{
              borderBottom: '1px solid black',
            }}
            item="infos"
          />{' '}
          <ItemMenuLateral
            setDisplay={setDisplay}
            style={{
              borderBottom: '1px solid black',
            }}
            item="fornecedores"
          />{' '}
          <ItemMenuLateral
            setDisplay={setDisplay}
            style={{
              borderBottom: '1px solid black',
            }}
            item="ambiente"
          />{' '}
          <ItemMenuLateral setDisplay={setDisplay} item="arquivos" />
        </MenuLateral>
        <div>
          {display == 'home' ? (
            <div className={classes.container}>
              <PaginaPrincipal />
            </div>
          ) : null}
          {display == 'infos' && usuario.nome !== undefined ? (
            <div className={classes.container}>
              <Infos usuario={usuario} setUsuario={setUsuario} />
            </div>
          ) : null}
          {display == 'fornecedores' ? (
            <div className={classes.container}>
              <Fornecedores
                setStateFornecedoresAdicionados={setFornecedoresAdicionados}
                setStateFornecedoresNaoAdicionados={setFornecedoresNaoAdicionados}
                fornecedoresAdicionados={fornecedoresAdicionados}
                fornecedoresNaoAdicionados={fornecedoresNaoAdicionados}
              />
            </div>
          ) : null}
          {display == 'ambiente' ? (
            <div className={classes.container}>
              <Ambiente setAmbiente={setAmbiente} ambiente={ambiente} userId={userId} />
            </div>
          ) : null}
          {display == 'arquivos' ? (
            <div className={classes.container}>
              <Arquivos userId={userId} nome={usuario.nome} logo={logo} setLogo={setLogo} />
            </div>
          ) : null}
        </div>
      </>
    );
  }
}

export default Home;
