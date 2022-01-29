import createDataContext from './createDataContext';
import api from '../services/api';

const profissionaisReducer = (state, action) => {
  switch (action.type) {
    case 'GET_PROFISSIONAIS_SUCCESS':
      return {
        ...state,
        profissionaisAdicionados: action.payload.profissionaisAdicionados,
        profissionaisNaoAdicionados: action.payload.profissionaisNaoAdicionados,
      };
    case 'ADD_PROFISSIONAIS_SUCCESS':
      return {
        ...state,
        profissionaisAdicionados: [...state.profissionaisAdicionados, action.payload],
        profissionaisNaoAdicionados: state.profissionaisNaoAdicionados.filter(
          (profissional) => profissional.profissional_userId !== action.payload.profissional_userId
        ),
      };
    case 'RESPOSTA_PROFISSIONAIS_SUCCESS':
      return {
        ...state,
        profissionaisAdicionados: [
          state.profissionaisAdicionados.map((profissional) =>
            profissional.profissional_userId == action.payload.profissional_userId
              ? action.payload
              : profissional
          ),
        ],
      };
    default:
      return state;
  }
};

const getProfissionais = (dispatch) => {
  return async () => {
    try {
      const response = await api.get(`/profissional/all`);

      dispatch({ type: 'GET_PROFISSIONAIS_SUCCESS', payload: response.data.profissionais });
    } catch (error) {
      dispatch({
        type: 'GET_PROFISSIONAIS_ERROR',
        payload: 'Something went wrong with fetching the profissionais',
      });
    }
  };
};

const getConexoesProfissionais = (dispatch) => {
  return async () => {
    const userId = localStorage.getItem('userId');

    try {
      const response = await api.get(`/profissional/conexoes`, {
        params: {
          fornecedorId: userId,
        },
      });

      const { profissionaisAdicionados, profissionaisNaoAdicionados } = response.data;

      dispatch({
        type: 'GET_PROFISSIONAIS_SUCCESS',
        payload: { profissionaisAdicionados, profissionaisNaoAdicionados },
      });
    } catch (error) {
      dispatch({
        type: 'GET_PROFISSIONAIS_ERROR',
        payload: 'Something went wrong with fetching the profissionais',
      });
    }
  };
};

const addProfissional = (dispatch) => {
  return async (profissionalId, fornecedorId) => {
    try {
      const response = await api.post(`/profissional/addProfissional`, {
        profissionalId,
        fornecedorId,
      });

      dispatch({ type: 'ADD_PROFISSIONAIS_SUCCESS', payload: response.data.profissional });
    } catch (error) {
      dispatch({
        type: 'ADD',
        payload: 'Something went wrong with fetching the fornecedores',
      });
    }
  };
};

const respostaConexao = (dispatch) => {
  return async (profissionalId, fornecedorId, resposta) => {
    try {
      const response = await api.post(`/profissional/confirmarConexao`, {
        profissionalId,
        fornecedorId,
        resposta,
      });

      dispatch({
        type: 'RESPOSTA_PROFISSIONAIS_SUCCESS',
        payload: response.data.profissional,
      });
    } catch (error) {
      dispatch({
        type: 'ADD',
        payload: 'Something went wrong with fetching the fornecedores',
      });
    }
  };
};

const recusarConexao = (dispatch) => {
  return async (profissionalId, fornecedorId, resposta) => {
    try {
      const response = await api.post(`/profissional/addProfissional`, {
        profissionalId,
        fornecedorId,
        resposta,
      });

      dispatch({ type: 'ADD_PROFISSIONAIS_SUCCESS', payload: response.data.profissional });
    } catch (error) {
      dispatch({
        type: 'ADD',
        payload: 'Something went wrong with fetching the fornecedores',
      });
    }
  };
};

const cancelarConexao = (dispatch) => {
  return async (profissionalId, fornecedorId) => {
    try {
      const response = await api.post(`/profissional/addProfissional`, {
        profissionalId,
        fornecedorId,
      });

      dispatch({ type: 'ADD_PROFISSIONAIS_SUCCESS', payload: response.data.profissional });
    } catch (error) {
      dispatch({
        type: 'ADD',
        payload: 'Something went wrong with fetching the fornecedores',
      });
    }
  };
};

export const { Provider, Context } = createDataContext(
  profissionaisReducer,
  {
    getProfissionais,
    getConexoesProfissionais,
    addProfissional,
    respostaConexao,
    recusarConexao,
    cancelarConexao,
  },
  { profissionaisAdicionados: [] }
);
