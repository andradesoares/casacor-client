import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../../services/api';
import Admins from '../../components/admin/admins';
import Usuarios from '../../components/admin/usuarios';
import Planilhas from '../../components/admin/planilhas';
import { signOut, TryLocalSignin } from '../../services/auth';

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [usuario, setUsuario] = useState([]);
  const [display, setDisplay] = useState('home');
  const [admins, setAdmins] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [profissionais, setProfissionais] = useState([]);

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
      setIsLoading(false);
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
  };
  if (isLoading) {
    return null;
  } else {
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
                setDisplay('usuarios');
              }}
            >
              Usuarios
            </button>

            <button
              type="button"
              onClick={() => {
                setDisplay('planilhas');
              }}
            >
              Planilhas
            </button>
            <button
              type="button"
              onClick={() => {
                signOut(router.push);
              }}
            >
              Logout
            </button>
          </div>
          {display == 'home' && usuario.tipo == 'pleno' ? (
            <Admins adminId={usuario.admin_userId} admins={admins} setAdmins={setAdmins} />
          ) : null}

          {display == 'usuarios' ? (
            <Usuarios
              usuarioTipo={usuario.tipo}
              fornecedores={fornecedores}
              profissionais={profissionais}
              setFornecedores={setFornecedores}
              setProfissionais={setProfissionais}
              adminId={usuario.admin_userId}
            />
          ) : null}
          {display == 'planilhas' ? (
            <Planilhas fornecedores={fornecedores} profissionais={profissionais} />
          ) : null}
        </div>
      </>
    );
  }
}

export default Home;
