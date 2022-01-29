import { Router, useRouter } from 'next/router';
import createDataContext from './createDataContext';
import api from '../services/api';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_IN_SUCCESS':
      return {
        errorMessage: '',
        token: action.payload.token,
        userId: action.payload.userId,
        usuario: action.payload.usuario,
      };
    case 'LOCALSIGN_IN_SUCCESS':
      return {
        ...state,
        errorMessage: '',
        token: action.payload.token,
        userId: action.payload.userId,
        loading: action.payload.loading,
      };
    case 'SIGN_UP_SUCCESS':
      return { ...state, signUpMessage: action.payload };
    case 'SIGN_UP_ERROR':
      return { ...state, signUpMessage: action.payload };
    case 'SIGN_IN_ERROR':
      return { ...state, signInMessage: action.payload };
    case 'REQUISICAO_SENHA_NOVA_SUCCESS':
      return { ...state, novaSenhaMessage: action.payload };
    case 'REQUISICAO_SENHA_NOVA_ERROR':
      return { ...state, novaSenhaMessage: action.payload };
    case 'SIGN_OUT_SUCCESS':
      return { token: null };
    case 'CLEAR_SIGN_UP_MESSAGE':
      return { ...state, signUpMessage: '' };
    case 'CLEAR_SIGN_IN_MESSAGE':
      return { ...state, signInMessage: '' };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => {
  const router = useRouter();

  return async () => {
    const token = localStorage.getItem('signIntoken');
    const userId = localStorage.getItem('userId');
    const tipoLocal = localStorage.getItem('tipo');

    if (token && userId && tipoLocal) {
      const loading = false;

      dispatch({ type: 'LOCALSIGN_IN_SUCCESS', payload: { token, userId, loading } });
      router.push(`/${tipoLocal}/${userId}`);
    }
  };
};

const clearSignInMessage = (dispatch) => () => {
  dispatch({ type: 'CLEAR_SIGN_IN_MESSAGE' });
};

const clearSignUpMessage = (dispatch) => () => {
  dispatch({ type: 'CLEAR_SIGN_UP_MESSAGE' });
};

const signUp = (dispatch) => {
  return async (body) => {
    try {
      const response = await api.post(`/user/${body.tipo}/signup`, body);

      dispatch({ type: 'SIGN_UP_SUCCESS', payload: response.data.message });
    } catch (error) {
      dispatch({
        type: 'SIGN_UP_ERROR',
        payload: 'Something went wrong with sign up',
      });
    }
  };
};

const signIn = (dispatch) => {
  const router = useRouter();

  return async (email, password, tipo) => {
    try {
      const response = await api.post('/auth/signin', { email, password, tipo });
      localStorage.setItem('signIntoken', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('tipo', tipo);

      const { token, userId, usuario } = response.data;

      dispatch({ type: 'SIGN_IN_SUCCESS', payload: { token, userId, usuario } });
      router.push(`/${tipo}/${response.data.userId}`);
    } catch (error) {
      dispatch({
        type: 'SIGN_IN_ERROR',
        payload: 'Something went wrong with sign in',
      });
    }
  };
};

const requisitarNovaSenha = (dispatch) => {
  return async (email, tipo) => {
    try {
      const response = await api.post('/user/requestPasswordReset', { email, tipo });

      dispatch({ type: 'REQUISICAO_SENHA_NOVA_SUCCESS', payload: response.data.message });
    } catch (error) {
      dispatch({
        type: 'REQUISICAO_SENHA_NOVA_ERROR',
        payload: 'Alguma coisa deu errada',
      });
    }
  };
};

const trocarSenha = (dispatch) => {
  return async (tipo, password, userId, resetToken) => {
    try {
      const response = await api.post('/user/passwordReset', {
        tipo,
        password,
        userId,
        resetToken,
      });

      dispatch({ type: 'REQUISICAO_SENHA_NOVA_SUCCESS', payload: response.data.message });
    } catch (error) {
      dispatch({
        type: 'REQUISICAO_SENHA_NOVA_ERROR',
        payload: 'Alguma coisa deu errada',
      });
    }
  };
};

const signOut = (dispatch) => {
  const router = useRouter();
  return async () => {
    localStorage.removeItem('signIntoken');
    localStorage.removeItem('userId');
    localStorage.removeItem('tipo');

    dispatch({ type: 'SIGN_OUT_SUCCESS' });

    router.push(`/`);
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    tryLocalSignin,
    clearSignInMessage,
    clearSignUpMessage,
    signUp,
    signIn,
    requisitarNovaSenha,
    trocarSenha,
    signOut,
  },
  { token: null, errorMessage: '', usuario: {} }
);
