import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../../services/api';
import Admins from '../../components/admin/admins';
import Usuarios from '../../components/admin/usuarios';
import Planilhas from '../../components/admin/planilhas';
import NavBar from '../../components/layout/navbar';
import MenuLateral from '../../components/layout/menuLateral';
import MenuSuperior from '../../components/layout/menuSuperior';
import ItemMenuLateral from '../../components/layout/itemMenuLateral';
import PaginaPrincipal from '../../components/admin/home';
import Mensagem from '../../components/admin/mensagem';

import classes from './user.module.scss';

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [usuario, setUsuario] = useState([]);
  const [display, setDisplay] = useState('home');
  const [admins, setAdmins] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [profissionais, setProfissionais] = useState([]);
  const [mensagens, setMensagens] = useState([]);

  const router = useRouter();
  const { userId } = router.query;

  useEffect(() => {
    if (Object.keys(router.query).length > 0) {
      search(userId);
      getAdmins(userId);
      getUsuarios();

      const token = localStorage.getItem('signIntoken');
      const userIdLocal = localStorage.getItem('userId');
      const tipoLocal = localStorage.getItem('tipo');

      if (!token || !userIdLocal || !tipoLocal) {
        router.push(`/`);
      }

      let timer1 = setTimeout(() => setIsLoading(false), 500);
      return () => {
        clearTimeout(timer1);
      };
    }
  }, [router.query]);

  const search = async (term) => {
    const response = await api.post(`/admin/getUsuario`, {
      adminId: term,
    });
    setUsuario(response.data.usuario);
  };

  const getAdmins = async (term) => {
    const response = await api.post(`/admin/getAll`, {
      adminId: term,
    });
    setAdmins(response.data.admins);
  };

  const getUsuarios = async (term) => {
    const response = await api.post(`/admin/getUsuarios`);
    setFornecedores(response.data.fornecedores);
    setProfissionais(response.data.profissionais);
    setMensagens(response.data.mensagens);
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
            item="planilhas"
          />{' '}
          {usuario.tipo == 'pleno' ? (
            <ItemMenuLateral
              setDisplay={setDisplay}
              style={{
                borderBottom: '1px solid black',
              }}
              item="administradores"
            />
          ) : null}
          <ItemMenuLateral
            setDisplay={setDisplay}
            style={{
              borderBottom: '1px solid black',
            }}
            item="mensagem"
          />{' '}
          <ItemMenuLateral setDisplay={setDisplay} item="usuarios" />{' '}
        </MenuLateral>
        <div>
          {display == 'home' ? (
            <div className={classes.container}>
              <PaginaPrincipal />
            </div>
          ) : null}
          {display == 'administradores' && usuario.tipo == 'pleno' ? (
            <div className={classes.container}>
              <Admins adminId={usuario.admin_userId} admins={admins} setAdmins={setAdmins} />
            </div>
          ) : null}
          {display == 'mensagem' && usuario.tipo == 'pleno' ? (
            <div className={classes.container}>
              <Mensagem
                adminId={usuario.admin_userId}
                mensagens={mensagens}
                setMensagens={setMensagens}
                tipo={usuario.tipo}
              />
            </div>
          ) : null}

          {display == 'usuarios' ? (
            <div className={classes.container}>
              <Usuarios
                usuarioTipo={usuario.tipo}
                fornecedores={fornecedores}
                profissionais={profissionais}
                setFornecedores={setFornecedores}
                setProfissionais={setProfissionais}
                adminId={usuario.admin_userId}
              />
            </div>
          ) : null}
          {display == 'planilhas' ? (
            <div className={classes.container}>
              <Planilhas fornecedores={fornecedores} profissionais={profissionais} />
            </div>
          ) : null}
        </div>
      </>
    );
  }
}

export default Home;
