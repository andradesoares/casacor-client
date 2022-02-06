import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../../services/api';
import Infos from '../../components/fornecedores/infos';
import Profissionais from '../../components/fornecedores/profissionais';
import Arquivos from '../../components/fornecedores/arquivos';
import PaginaPrincipal from '../../components/fornecedores/home';
import NavBar from '../../components/fornecedores/navbar';
import MenuLateral from '../../components/layout/menuLateral';
import ItemMenuLateral from '../../components/layout/itemMenuLateral';
import Mensagem from '../../components/fornecedores/mensagem';

import classes from './user.module.scss';

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [usuario, setUsuario] = useState([]);
  const [profissionaisAdicionados, setProfissionaisAdicionados] = useState([]);
  const [profissionaisNaoAdicionados, setProfissionaisNaoAdicionados] = useState([]);
  const [display, setDisplay] = useState('home');
  const [logo, setLogo] = useState('');
  const [mensagens, setMensagens] = useState([]);

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
    const response = await api.post(`/fornecedor/lerUsuario`, {
      fornecedorId: term,
    });
    setUsuario(response.data.usuario);
    setLogo(response.data.usuario.logo);
    setMensagens(response.data.mensagens);
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

  if (isLoading) {
    return null;
  } else {
    return (
      <>
        <NavBar
          setStateProfissionaisAdicionados={setProfissionaisAdicionados}
          setStateProfissionaisNaoAdicionados={setProfissionaisNaoAdicionados}
          profissionaisAdicionados={profissionaisAdicionados}
          profissionaisNaoAdicionados={profissionaisNaoAdicionados}
          usuario={usuario}
          userId={userId}
          tipo={localStorage.getItem('tipo')}
        />
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
            item="profissionais"
          />{' '}
          <ItemMenuLateral
            setDisplay={setDisplay}
            item="arquivos"
            style={{
              borderBottom: '1px solid black',
            }}
          />
          <ItemMenuLateral setDisplay={setDisplay} item="mensagens" />{' '}
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
          {display == 'profissionais' ? (
            <div className={classes.container}>
              <Profissionais
                setStateProfissionaisAdicionados={setProfissionaisAdicionados}
                setStateProfissionaisNaoAdicionados={setProfissionaisNaoAdicionados}
                profissionaisAdicionados={profissionaisAdicionados}
                profissionaisNaoAdicionados={profissionaisNaoAdicionados}
              />
            </div>
          ) : null}
          {display == 'arquivos' ? (
            <div className={classes.container}>
              <Arquivos userId={userId} nome={usuario.nome} logo={logo} setLogo={setLogo} />
            </div>
          ) : null}
          {display == 'mensagens' ? (
            <div className={classes.container}>
              <Mensagem mensagens={mensagens} />
            </div>
          ) : null}
        </div>
      </>
    );
  }
}

export default Home;
