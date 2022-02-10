import React from 'react';

import classes from './trocarUsuario.module.scss';

const TrocarUsuario = ({ setUsuario, usuario }) => {
  return (
    <div className={classes.buttonContainer}>
      <p
        className={`${classes.button} ${
          usuario == 'profissional' ? classes.selected : classes.unselected
        }`}
        onClick={() => setUsuario('profissional')}
      >
        Profissional
      </p>
      <p
        className={`${classes.button} ${
          usuario == 'fornecedor' ? classes.selected : classes.unselected
        }`}
        onClick={() => setUsuario('fornecedor')}
      >
        Fornecedor
      </p>
    </div>
  );
};

export default TrocarUsuario;
