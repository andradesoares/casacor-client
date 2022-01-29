import api from './api';

const TryLocalSignin = async (setLoading, route) => {
  const token = localStorage.getItem('signIntoken');
  const userId = localStorage.getItem('userId');
  const tipoLocal = localStorage.getItem('tipo');

  if (token && userId && tipoLocal) {
    route(`/${tipoLocal}/${userId}`);
  }

  setLoading(false);
};

const signUp = async (body, setError) => {
  try {
    await api.post(`http://localhost:3001/user/${body.tipo}/signup`, body);
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

const requisitarNovaSenha = async (email, tipo, setError) => {
  try {
    const response = await api.post('/user/requestPasswordReset', { email, tipo });
  } catch (error) {
    setError(error.response.data.error);
  }
};

const trocarSenha = async (tipo, password, userId, resetToken, setError) => {
  try {
    const response = await api.post('/user/passwordReset', {
      tipo,
      password,
      userId,
      resetToken,
    });
  } catch (error) {
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
