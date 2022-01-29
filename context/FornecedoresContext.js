import createDataContext from './createDataContext';
import api from '../services/api';

const fornecedoresReducer = (state, action) => {
  switch (action.type) {
    case 'GET_FORNECEDORES_SUCCESS':
      return { ...state, fornecedores: action.payload };
    default:
      return state;
  }
};

const getFornecedores = (dispatch) => {
  return async () => {
    try {
      const response = await api.get(`/fornecedores/all`);

      dispatch({ type: 'GET_FORNECEDORES_SUCCESS', payload: response.data.fornecedores });
    } catch (error) {
      dispatch({
        type: 'GET_FORNECEDORES_ERROR',
        payload: 'Something went wrong with fetching the fornecedores',
      });
    }
  };
};

const addFornecedor = (dispatch) => {
  return async (profissionalId, fornecedorId) => {
    try {
      const response = await api.post(`/fornecedores/addFornecedor`, {
        profissionalId,
        fornecedorId,
      });

      dispatch({ type: 'GET_PROFISSIONAIS_SUCCESS', payload: response.data.profissionais });
    } catch (error) {
      dispatch({
        type: 'SIGN_UP_ERROR',
        payload: 'Something went wrong with fetching the fornecedores',
      });
    }
  };
};

export const { Provider, Context } = createDataContext(
  fornecedoresReducer,
  { getFornecedores, addFornecedor },
  []
);
