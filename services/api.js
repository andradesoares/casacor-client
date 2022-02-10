import axios from 'axios';

const api = axios.create({
  baseURL: 'https://casa-cor.herokuapp.com',
});
api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('signIntoken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
