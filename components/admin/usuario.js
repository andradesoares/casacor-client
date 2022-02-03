import { useState } from 'react';

import classes from './usuario.module.scss';

const Usuario = ({ usuario }) => {
  return (
    <>
      <div className={classes.container}>
        <p className={classes.titulo}>Nome:</p>
        <p className={classes.usuario}>{usuario.nome}</p>
      </div>
    </>
  );
};

export default Usuario;
