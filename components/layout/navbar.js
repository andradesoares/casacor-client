import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { dynamicSort } from '../../services/helpers';
import api from '../../services/api';
import { signOut } from '../../services/auth';
import classes from './navbar.module.scss';

import notification from '../../images/icons/notification.png';

function NavBar({ usuario, tipo }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={classes.container}>
        <h1 className={classes.logo}>LOGO</h1>
        <h2 className={classes.tipoUsuario}>{tipo}</h2>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              position: 'relative',
              display: 'flex',
              borderRight: '1px solid black',
              padding: '0 10px',
              height: '30px',
              margin: '0',
              alignItems: 'center',
            }}
          >
            <p className={classes.bemVindo}>Seja bem-vindo</p>
            <p
              style={{ display: 'flex', alignItems: 'center', margin: '0' }}
              className={classes.usuario}
            >
              {usuario.nome}
            </p>
          </div>

          <p
            style={{ paddingLeft: '10px' }}
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
