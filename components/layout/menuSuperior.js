import { Children, useState } from 'react';
import { useRouter } from 'next/router';

import api from '../../services/api';
import { signOut } from '../../services/auth';

import classes from './menuSuperior.module.scss';

function MenuSuperior({ children }) {
  const router = useRouter();

  return (
    <>
      <div className={classes.container}>
        <div className={classes.item}>{children}</div>
      </div>
    </>
  );
}

export default MenuSuperior;
