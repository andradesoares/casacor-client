import { useRouter } from 'next/router';
import { dynamicSort } from '../../services/helpers';
import api from '../../services/api';

import classes from './profissionais.module.scss';
import { useState } from 'react';

function Profissionais({
  profissionaisAdicionados,
  profissionaisNaoAdicionados,
  setStateProfissionaisAdicionados,
  setStateProfissionaisNaoAdicionados,
}) {
  const [display, setDisplay] = useState('adicionados');
  const router = useRouter();
  const { userId } = router.query;

  const comecarConexao = async (profissionalId, fornecedorId) => {
    const response = await api.post(`/fornecedor/adicionarProfissional`, {
      profissionalId,
      fornecedorId,
    });

    setStateProfissionaisAdicionados([...profissionaisAdicionados, response.data.profissional]);
    setStateProfissionaisNaoAdicionados(
      profissionaisNaoAdicionados.filter(
        (profissional) =>
          profissional.profissional_userId !== response.data.profissional.profissional_userId
      )
    );
  };

  const respostaConexao = async (profissionalId, fornecedorId, resposta) => {
    const response = await api.post(`/fornecedor/confirmarConexao`, {
      profissionalId,
      fornecedorId,
      resposta,
    });

    if (resposta == 'confirmado') {
      setStateProfissionaisAdicionados(
        profissionaisAdicionados.map((profissional) =>
          profissional.profissional_userId == response.data.profissional.profissional_userId
            ? response.data.profissional
            : profissional
        )
      );
    } else if (resposta == 'recusado') {
      setStateProfissionaisNaoAdicionados([
        ...profissionaisNaoAdicionados,
        response.data.profissional,
      ]);
      setStateProfissionaisAdicionados(
        profissionaisAdicionados.filter(
          (profissional) =>
            profissional.profissional_userId !== response.data.profissional.profissional_userId
        )
      );
    }
  };

  const cancelarConexao = async (profissionalId, fornecedorId) => {
    const response = await api.post(`/fornecedor/cancelarConexao`, {
      profissionalId,
      fornecedorId,
    });
    setStateProfissionaisNaoAdicionados([
      ...profissionaisNaoAdicionados,
      response.data.profissional,
    ]);
    setStateProfissionaisAdicionados(
      profissionaisAdicionados.filter(
        (profissional) =>
          profissional.profissional_userId !== response.data.profissional.profissional_userId
      )
    );
  };

  return (
    <>
      <div className={classes.container}>
        <div style={{ display: 'flex' }}>
          <p
            className={`${classes.profissional} ${
              display == 'adicionados' ? classes.selected : classes.unselected
            }`}
            onClick={() => setDisplay('adicionados')}
          >
            Adicionados
          </p>
          <p
            className={`${classes.profissional} ${
              display == 'naoAdicionados' ? classes.selected : classes.unselected
            }`}
            onClick={() => setDisplay('naoAdicionados')}
          >
            Não Adicionados
          </p>
        </div>
        {display == 'naoAdicionados' && (
          <ul>
            {profissionaisNaoAdicionados.sort(dynamicSort('nome')).map((profissional) => (
              <li key={profissional.profissional_userId}>
                {profissional.nome}
                <button
                  onClick={() => {
                    comecarConexao(profissional.profissional_userId, userId);
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
            {profissionaisAdicionados.sort(dynamicSort('nome')).map((profissional) => (
              <li key={profissional.profissional_userId}>
                {profissional.nome}
                {profissional.Fornecedors[0].FornecedorProfissional.status == 'confirmado' ? (
                  '- Confirmado'
                ) : profissional.Fornecedors[0].FornecedorProfissional.status == 'pendente' &&
                  profissional.Fornecedors[0].FornecedorProfissional.iniciadoPor == 'fornecedor' ? (
                  <button
                    onClick={() => {
                      cancelarConexao(profissional.profissional_userId, userId);
                    }}
                  >
                    Cancelar
                  </button>
                ) : profissional.Fornecedors[0].FornecedorProfissional.status == 'pendente' &&
                  profissional.Fornecedors[0].FornecedorProfissional.iniciadoPor ==
                    'profissional' ? (
                  <>
                    <button
                      onClick={() => {
                        respostaConexao(profissional.profissional_userId, userId, 'confirmado');
                      }}
                    >
                      Confirmar
                    </button>
                    <button
                      onClick={() => {
                        respostaConexao(profissional.profissional_userId, userId, 'recusado');
                      }}
                    >
                      Recusar
                    </button>
                  </>
                ) : profissional.Fornecedors[0].FornecedorProfissional.status == 'pendente' &&
                  profissional.Fornecedors[0].FornecedorProfissional.iniciadoPor == 'fornecedor' ? (
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

export default Profissionais;
