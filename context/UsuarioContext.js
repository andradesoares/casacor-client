import createDataContext from './createDataContext';
import api from '../services/api';

const usuariosReducer = (state, action) => {
  switch (action.type) {
    case 'LER_USUARIOS_SUCESSO':
      return {
        ...state,
        adicionados: action.payload.adicionados,
        naoAdicionados: action.payload.naoAdicionados,
      };
    case 'COMECAR_CONEXAO_SUCESSO':
      return {
        ...state,
        adicionados: [...state.adicionados, action.payload.usuarioOpostoData],
        naoAdicionados: state.naoAdicionados.filter(
          (item) =>
            item[`${action.payload.usuarioOposto}_userId`] !==
            action.payload.usuarioOpostoData[`${action.payload.usuarioOposto}_userId`]
        ),
      };
    case 'CONFIRMAR_CONEXAO_SUCESSO':
      return {
        ...state,
        adicionados: state.adicionados.map((pessoa) =>
          pessoa[`${usuarioOpostoTipo}_userId`] ==
          action.payload.usuarioOpostoData[`${action.payload.usuarioOposto}_userId`]
            ? action.payload.usuarioOpostoData
            : pessoa
        ),
      };
    case 'RECUSAR_CONEXAO_SUCESSO':
      return {
        ...state,
        naoAdicionados: [...state.naoAdicionados, action.payload.usuarioOpostoData],
        adicionados: state.adicionados.filter(
          (item) =>
            item[`${action.payload.usuarioOposto}_userId`] !==
            action.payload.usuarioOpostoData[`${action.payload.usuarioOposto}_userId`]
        ),
      };
    case 'CANCELAR_CONEXAO_SUCESSO':
      return {
        ...state,
        naoAdicionados: [...state.naoAdicionados, action.payload.usuarioOpostoData],
        adicionados: state.adicionados.filter(
          (item) =>
            item[`${action.payload.usuarioOposto}_userId`] !==
            action.payload.usuarioOpostoData[`${action.payload.usuarioOposto}_userId`]
        ),
      };
    default:
      return state;
  }
};

const lerUsuariosOpostos = (dispatch) => {
  return async (tipo, userId) => {
    try {
      const response = await api.get(`/${tipo}/lerConexoes`, {
        params: {
          userId: userId,
        },
      });

      const { adicionados, naoAdicionados } = response.data;
      dispatch({ type: 'LER_USUARIOS_SUCESSO', payload: { adicionados, naoAdicionados } });
    } catch (error) {
      dispatch({
        type: 'LER_USUARIOS_ERROR',
        payload: 'Something went wrong with fetching the users',
      });
    }
  };
};

const comecarConexao = (dispatch) => {
  return async (tipo, usuarioId, usuarioOpostoId, usuarioOposto) => {
    try {
      const response = await api.post(`/${tipo}/adicionar${usuarioOposto}`, {
        usuarioId,
        usuarioOpostoId,
      });

      const { usuarioOpostoData } = response.data;

      dispatch({ type: 'COMECAR_CONEXAO_SUCESSO', payload: { usuarioOpostoData, usuarioOposto } });
    } catch (error) {
      dispatch({
        type: 'COMECAR_CONEXAO_ERROR',
        payload: 'Something went wrong with conecting',
      });
    }
  };
};

const confirmarConexao = (dispatch) => {
  return async (tipo, usuarioId, usuarioOpostoId, usuarioOposto) => {
    try {
      const response = await api.post(`/${tipo}/confirmarConexao`, {
        usuarioId,
        usuarioOpostoId,
        resposta: 'confirmado',
      });

      const { usuarioOpostoData } = response.data;

      dispatch({
        type: 'CONFIRMAR_CONEXAO_SUCESSO',
        payload: { usuarioOpostoData, usuarioOposto },
      });
    } catch (error) {
      dispatch({
        type: 'CONFIRMAR_CONEXAO_ERROR',
        payload: 'Something went wrong with responding',
      });
    }
  };
};

const recusarConexao = (dispatch) => {
  return async (tipo, usuarioId, usuarioOpostoId, usuarioOposto) => {
    try {
      const response = await api.post(`/${tipo}/confirmarConexao`, {
        usuarioId,
        usuarioOpostoId,
        resposta: 'recusado',
      });

      const { usuarioOpostoData } = response.data;

      dispatch({ type: 'RECUSAR_CONEXAO_SUCESSO', payload: { usuarioOpostoData, usuarioOposto } });
    } catch (error) {
      dispatch({
        type: 'RECUSAR_CONEXAO_ERROR',
        payload: 'Something went wrong with responding',
      });
    }
  };
};

const cancelarConexao = (dispatch) => {
  return async (tipo, usuarioId, usuarioOpostoId, usuarioOposto) => {
    try {
      const response = await api.post(`/${tipo}/cancelarConexao`, {
        usuarioId,
        usuarioOpostoId,
      });

      const { usuarioOpostoData } = response.data;

      dispatch({ type: 'RECUSAR_CONEXAO_SUCESSO', payload: { usuarioOpostoData, usuarioOposto } });
    } catch (error) {
      dispatch({
        type: 'RECUSAR_CONEXAO_ERROR',
        payload: 'Something went wrong with responding',
      });
    }
  };
};

export const { Provider, Context } = createDataContext(
  usuariosReducer,
  { comecarConexao, lerUsuariosOpostos, confirmarConexao, recusarConexao, cancelarConexao },
  { adicionados: [], naoAdicionados: [] }
);
