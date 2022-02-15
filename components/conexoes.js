import { useContext } from 'react';
import { useRouter } from 'next/router';
import { Context as UsuarioContext } from '../context/UsuarioContext';
import { dynamicSort } from '../services/helpers';

import classes from './conexoes.module.scss';
import { useState } from 'react';

function Conexoes({ tableName, usuarioOposto, tipo }) {
  const [display, setDisplay] = useState('adicionados');
  const router = useRouter();
  const { userId } = router.query;

  const {
    state: { adicionados, naoAdicionados },
    cancelarConexao,
    comecarConexao,
    confirmarConexao,
    recusarConexao,
  } = useContext(UsuarioContext);

  const listaAdicionados = (array, usuarioOposto) => {
    return array.sort(dynamicSort('nome')).map((item) => (
      <li key={item[`${usuarioOposto}_userId`]}>
        <p className={classes.usuarioOpostoNome}>{item.nome}</p>
        {item[tableName][0].FornecedorProfissional.status == 'confirmado' ? (
          '- Confirmado'
        ) : item[tableName][0].FornecedorProfissional.status == 'pendente' &&
          item[tableName][0].FornecedorProfissional.iniciadoPor == tipo ? (
          <button
            onClick={() => {
              cancelarConexao(tipo, userId, item[`${usuarioOposto}_userId`], usuarioOposto);
            }}
          >
            Cancelar
          </button>
        ) : item[tableName][0].FornecedorProfissional.status == 'pendente' &&
          item[tableName][0].FornecedorProfissional.iniciadoPor == usuarioOposto ? (
          <>
            <button
              onClick={() => {
                confirmarConexao(tipo, userId, item[`${usuarioOposto}_userId`], usuarioOposto);
              }}
            >
              Confirmar
            </button>
            <button
              onClick={() => {
                recusarConexao(tipo, userId, item[`${usuarioOposto}_userId`], usuarioOposto);
              }}
            >
              Recusar
            </button>
          </>
        ) : item[tableName][0].FornecedorProfissional.status == 'pendente' &&
          item[tableName][0].FornecedorProfissional.iniciadoPor == tipo ? (
          'Cancelar'
        ) : null}
      </li>
    ));
  };

  const listaNaoAdicionados = (array, usuarioOposto) => {
    return array.sort(dynamicSort('nome')).map((item) => (
      <li key={item[`${usuarioOposto}_userId`]}>
        <p className={classes.usuarioOpostoNome}>{item.nome}</p>
        {console.log(item[`fornecedor_userId`])}
        <button
          onClick={() => {
            comecarConexao(tipo, userId, item[`${usuarioOposto}_userId`], usuarioOposto);
          }}
        >
          Adicionar
        </button>
      </li>
    ));
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.conexoes}>
          <p
            className={`${classes.usuarioOposto} ${
              display == 'adicionados' ? classes.selected : classes.unselected
            }`}
            onClick={() => setDisplay('adicionados')}
          >
            Adicionados
          </p>
          <p
            className={`${classes.usuarioOposto} ${
              display == 'naoAdicionados' ? classes.selected : classes.unselected
            }`}
            onClick={() => setDisplay('naoAdicionados')}
          >
            Não Adicionados
          </p>
        </div>
        {display == 'naoAdicionados' && (
          <ul>{listaNaoAdicionados(naoAdicionados, usuarioOposto)}</ul>
        )}
        {display == 'adicionados' && <ul>{listaAdicionados(adicionados, usuarioOposto)}</ul>}
      </div>
    </>
  );
}

export default Conexoes;
