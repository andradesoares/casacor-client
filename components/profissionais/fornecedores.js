import { useRouter } from 'next/router';
import { dynamicSort } from '../../services/helpers';
import api from '../../services/api';

import classes from './fornecedores.module.scss';
import { useState } from 'react';

function Fornecedores({
  fornecedoresAdicionados,
  fornecedoresNaoAdicionados,
  setStateFornecedoresAdicionados,
  setStateFornecedoresNaoAdicionados,
}) {
  const [display, setDisplay] = useState('adicionados');
  const router = useRouter();
  const { userId } = router.query;

  const comecarConexao = async (profissionalId, fornecedorId) => {
    const response = await api.post(`/profissional/adicionarFornecedor`, {
      profissionalId,
      fornecedorId,
    });

    setStateFornecedoresAdicionados([...fornecedoresAdicionados, response.data.fornecedor]);
    setStateFornecedoresNaoAdicionados(
      fornecedoresNaoAdicionados.filter(
        (fornecedor) => fornecedor.fornecedor_userId !== response.data.fornecedor.fornecedor_userId
      )
    );
  };

  const respostaConexao = async (profissionalId, fornecedorId, resposta) => {
    const response = await api.post(`/profissional/confirmarConexao`, {
      profissionalId,
      fornecedorId,
      resposta,
    });

    if (resposta == 'confirmado') {
      setStateFornecedoresAdicionados(
        fornecedoresAdicionados.map((fornecedor) =>
          fornecedor.fornecedor_userId == response.data.fornecedor.fornecedor_userId
            ? response.data.fornecedor
            : fornecedor
        )
      );
    } else if (resposta == 'recusado') {
      setStateFornecedoresNaoAdicionados([...fornecedoresNaoAdicionados, response.data.fornecedor]);
      setStateFornecedoresAdicionados(
        fornecedoresAdicionados.filter(
          (fornecedor) =>
            fornecedor.fornecedor_userId !== response.data.fornecedor.fornecedor_userId
        )
      );
    }
  };

  const cancelarConexao = async (profissionalId, fornecedorId) => {
    const response = await api.post(`/profissional/cancelarConexao`, {
      profissionalId,
      fornecedorId,
    });
    setStateFornecedoresNaoAdicionados([...fornecedoresNaoAdicionados, response.data.fornecedor]);
    setStateFornecedoresAdicionados(
      fornecedoresAdicionados.filter(
        (fornecedor) => fornecedor.fornecedor_userId !== response.data.fornecedor.fornecedor_userId
      )
    );
  };

  return (
    <>
      <div className={classes.container}>
        <div style={{ display: 'flex' }}>
          <p
            className={`${classes.fornecedor} ${
              display == 'adicionados' ? classes.selected : classes.unselected
            }`}
            onClick={() => setDisplay('adicionados')}
          >
            Adicionados
          </p>
          <p
            className={`${classes.fornecedor} ${
              display == 'naoAdicionados' ? classes.selected : classes.unselected
            }`}
            onClick={() => setDisplay('naoAdicionados')}
          >
            Não Adicionados
          </p>
        </div>
        {display == 'naoAdicionados' && (
          <ul>
            {fornecedoresNaoAdicionados.sort(dynamicSort('nome')).map((fornecedor) => (
              <li key={fornecedor.fornecedor_userId}>
                <p>{fornecedor.nome}</p>
                <button
                  onClick={() => {
                    comecarConexao(userId, fornecedor.fornecedor_userId);
                  }}
                >
                  Adicionar
                </button>
              </li>
            ))}
          </ul>
        )}
        {display == 'adicionados' && (
          <ul>
            {fornecedoresAdicionados.sort(dynamicSort('nome')).map((fornecedor) => (
              <li key={fornecedor.fornecedor_userId}>
                <p>{fornecedor.nome}</p>
                {fornecedor.Profissionals[0].FornecedorProfissional.status == 'confirmado' ? (
                  '- Confirmado'
                ) : fornecedor.Profissionals[0].FornecedorProfissional.status == 'pendente' &&
                  fornecedor.Profissionals[0].FornecedorProfissional.iniciadoPor ==
                    'profissional' ? (
                  <button
                    onClick={() => {
                      cancelarConexao(userId, fornecedor.fornecedor_userId);
                    }}
                  >
                    Cancelar
                  </button>
                ) : fornecedor.Profissionals[0].FornecedorProfissional.status == 'pendente' &&
                  fornecedor.Profissionals[0].FornecedorProfissional.iniciadoPor == 'fornecedor' ? (
                  <>
                    <button
                      onClick={() => {
                        respostaConexao(userId, fornecedor.fornecedor_userId, 'confirmado');
                      }}
                    >
                      Confirmar
                    </button>
                    <button
                      onClick={() => {
                        respostaConexao(userId, fornecedor.fornecedor_userId, 'recusado');
                      }}
                    >
                      Recusar
                    </button>
                  </>
                ) : fornecedor.Profissionals[0].FornecedorProfissional.status == 'pendente' &&
                  fornecedor.Profissionals[0].FornecedorProfissional.iniciadoPor ==
                    'profissional' ? (
                  'Cancelar'
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Fornecedores;
