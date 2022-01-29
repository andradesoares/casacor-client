import createDataContext from './createDataContext';

const tipoReducer = (state, action) => {
  switch (action.type) {
    case 'MUDAR_TIPO':
      return { tipo: action.payload };
    default:
      return state;
  }
};

const mudarTipo = (dispatch) => async (tipo) => {
  dispatch({ type: 'MUDAR_TIPO', payload: tipo });
};

export const { Provider, Context } = createDataContext(
  tipoReducer,
  { mudarTipo },
  { tipo: 'profissional' }
);
