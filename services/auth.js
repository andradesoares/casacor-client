import api from './api';

const TryLocalSignin = async (route) => {
  const token = localStorage.getItem('signIntoken');
  const userId = localStorage.getItem('userId');
  const tipoLocal = localStorage.getItem('tipo');

  if (token && userId && tipoLocal) {
    route(`/${tipoLocal}/${userId}`);
  }
};

const signUp = async (body, setError, setMessage) => {
  try {
    await api.post(`/user/${body.tipo}/signup`, body);
    setMessage(response.data.message);
    setError('');
  } catch (error) {
    setError(error.response.data.error);
  }
};

const signIn = async (email, password, tipo, route, setError) => {
  try {
    const response = await api.post('/auth/signin', { email, password, tipo });

    localStorage.setItem('signIntoken', response.data.token);
    localStorage.setItem('userId', response.data.userId);
    localStorage.setItem('tipo', tipo);
    setError('');
    route(`/${tipo}/${response.data.userId}`);
  } catch (error) {
    setError(error.response.data.error);
  }
};

const requisitarNovaSenha = async (email, tipo, setError, setMessage) => {
  try {
    const response = await api.post('/user/requestPasswordReset', { email, tipo });
    setMessage(response.data.message);
  } catch (error) {
    setError(error.response.data.error);
  }
};

const trocarSenha = async (tipo, password, userId, resetToken, setError, setMessage) => {
  try {
    const response = await api.post('/user/passwordReset', {
      tipo,
      password,
      userId,
      resetToken,
    });
    setMessage(response.data.message);
  } catch (error) {
    console.log(error.response.data.error);
    setError(error.response.data.error);
  }
};

const signOut = async (route) => {
  localStorage.removeItem('signIntoken');
  localStorage.removeItem('userId');
  localStorage.removeItem('tipo');
  route(`/`);
};

export { signUp, TryLocalSignin, signIn, requisitarNovaSenha, trocarSenha, signOut };
