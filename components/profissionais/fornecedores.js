import { useRouter } from 'next/router';
import { dynamicSort } from '../../services/helpers';
import api from '../../services/api';

function Fornecedores({
  fornecedoresAdicionados,
  fornecedoresNaoAdicionados,
  setStateFornecedoresAdicionados,
  setStateFornecedoresNaoAdicionados,
}) {
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
      <div>
        Não Adicionados
        {fornecedoresNaoAdicionados && (
          <ul>
            {fornecedoresNaoAdicionados.sort(dynamicSort('nome')).map((fornecedor) => (
              <li key={fornecedor.fornecedor_userId}>
                {fornecedor.nome}
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
        Adicionados
        {fornecedoresAdicionados && (
          <ul>
            {fornecedoresAdicionados.sort(dynamicSort('nome')).map((fornecedor) => (
              <li key={fornecedor.fornecedor_userId}>
                {fornecedor.nome} -
                {fornecedor.Profissionals[0].FornecedorProfissional.status == 'confirmado' ? (
                  ' Confirmado'
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
