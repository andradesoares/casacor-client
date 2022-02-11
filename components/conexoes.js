import { useRouter } from 'next/router';
import { dynamicSort } from '../services/helpers';
import api from '../services/api';

import classes from './conexoes.module.scss';
import { useState } from 'react';

function Conexoes({
  setAdicionados,
  setNaoAdicionados,
  adicionados,
  naoAdicionados,
  tableName,
  usuarioOposto,
  tipo,
}) {
  const [display, setDisplay] = useState('adicionados');
  const router = useRouter();
  const { userId } = router.query;

  const comecarConexao = async (usuarioId, usuarioOpostoId, usuarioOposto) => {
    const response = await api.post(`/${tipo}/adicionar${usuarioOposto}`, {
      usuarioId,
      usuarioOpostoId,
    });

    setAdicionados([...adicionados, response.data[`${usuarioOposto}`]]);
    setNaoAdicionados(
      naoAdicionados.filter(
        (item) =>
          item[`${usuarioOposto}_userId`] !==
          response.data[`${usuarioOposto}`][`${usuarioOposto}_userId`]
      )
    );
  };

  const respostaConexao = async (usuarioId, usuarioOpostoId, resposta, usuarioOpostoTipo) => {
    const response = await api.post(`/${tipo}/confirmarConexao`, {
      usuarioId,
      usuarioOpostoId,
      resposta,
    });

    if (resposta == 'confirmado') {
      setAdicionados(
        adicionados.map((pessoa) =>
          pessoa[`${usuarioOpostoTipo}_userId`] ==
          response.data[`${usuarioOpostoTipo}`][`${usuarioOpostoTipo}_userId`]
            ? response.data[`${usuarioOpostoTipo}`]
            : pessoa
        )
      );
    } else if (resposta == 'recusado') {
      setNaoAdicionados([...naoAdicionados, response.data[`${usuarioOpostoTipo}`]]);
      setAdicionados(
        adicionados.filter(
          (pessoa) =>
            pessoa[`${usuarioOpostoTipo}_userId`] !==
            response.data[`${usuarioOpostoTipo}`][`${usuarioOpostoTipo}_userId`]
        )
      );
    }
  };

  const cancelarConexao = async (usuarioId, usuarioOpostoId, usuarioOpostoTipo) => {
    const response = await api.post(`/${tipo}/cancelarConexao`, {
      usuarioId,
      usuarioOpostoId,
    });
    setNaoAdicionados([...naoAdicionados, response.data[`${usuarioOpostoTipo}`]]);
    setAdicionados(
      adicionados.filter(
        (item) =>
          item[`${usuarioOpostoTipo}_userId`] !==
          response.data[`${usuarioOpostoTipo}`][`${usuarioOpostoTipo}_userId`]
      )
    );
  };

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
              cancelarConexao(userId, item[`${usuarioOposto}_userId`], usuarioOposto);
            }}
          >
            Cancelar
          </button>
        ) : item[tableName][0].FornecedorProfissional.status == 'pendente' &&
          item[tableName][0].FornecedorProfissional.iniciadoPor == usuarioOposto ? (
          <>
            <button
              onClick={() => {
                respostaConexao(
                  userId,
                  item[`${usuarioOposto}_userId`],
                  'confirmado',
                  usuarioOposto
                );
              }}
            >
              Confirmar
            </button>
            <button
              onClick={() => {
                respostaConexao(userId, item[`${usuarioOposto}_userId`], 'recusado', usuarioOposto);
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
      <li key={item[`${usuarioOposto}_userId]`]}>
        <p className={classes.usuarioOpostoNome}>{item.nome}</p>
        <button
          onClick={() => {
            comecarConexao(userId, item[`${usuarioOposto}_userId]`], usuarioOposto);
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
        <div style={{ display: 'flex' }}>
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
