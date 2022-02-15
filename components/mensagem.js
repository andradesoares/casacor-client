import { useState } from 'react';

import classes from './mensagem.module.scss';
import api from '../services/api';

const Mensagem = ({ mensagens }) => {
  return (
    <div className={classes.mensagem}>
      {mensagens.map((mensagem) => {
        return (
          <div>
            <h3>{mensagem.titulo}</h3>
            <p>{mensagem.mensagem}</p>
            <p>{new Date(mensagem.createdAt).toLocaleString()}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Mensagem;
