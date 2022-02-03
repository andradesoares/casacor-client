import { useRouter } from 'next/router';

import { signOut } from '../../services/auth';
import classes from './navbar.module.scss';

function NavBar({ usuario, tipo }) {
  const router = useRouter();

  return (
    <>
      <div className={classes.container}>
        <h1 className={classes.logo}>CasaCor</h1>
        <h2 className={classes.tipoUsuario}>{tipo}</h2>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex' }}>
            <p style={{ marginRight: '5px' }}>Seja bem-vindo</p>
            <p className={classes.usuario}>{usuario.nome}</p>
          </div>
          <p
            className={classes.logoutButton}
            onClick={() => {
              signOut(router.push);
            }}
          >
            Logout
          </p>
        </div>
      </div>
    </>
  );
}

export default NavBar;
