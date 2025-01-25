import axios from 'axios';
import { store } from '../AREDUX/store';
const api = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});
api.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const setAxiosBaseURL = baseURL => {
  api.defaults.baseURL = baseURL;
  console.log('API Base URL:', api.defaults.baseURL);
};

export const setAxiosHeader = token => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

const userApi = {
  signup: async data => {
    console.log('Sending signup request:', data);
    const response = await api.post('/account/register', data);
    if (response.status !== 201 || !response.data.data) {
      
      throw new Error('Registration failed');
    }
    const { token } = response.data.data;
    setAxiosHeader(token);

    return response.data;
  },

  login: async data => {
    try {
      const response = await api.post('/account/login', data);

      console.log('Full response from API:', response.data);

      if (response.status !== 201 || !response.data.data) {
        console.error('Autentificare eșuată');
        throw new Error('Email sau parolă incorectă');
      }

      if (response.data && response.data.data) {
        const { email, name, token } = response.data.data;
        setAxiosHeader(token);
        return { email, name, token };
      }

      console.error('Invalid response structure:', response);
      throw new Error('Invalid response structure from API.');
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  },

  logout: async () => {
    console.log(
      'Authorization Header before logout:',
      api.defaults.headers.common.Authorization
    );
    try {
      const authHeader = api.defaults.headers.common.Authorization;
      const token = authHeader ? authHeader.split(' ')[1] : null;

      const response = await api.post(
        '/account/logout',
        {},
        {
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      console.log('Logout API response:', response.status);

      setAxiosHeader(null);
    } catch (error) {
      console.error('Logout API error:', error.response?.data || error.message);

      throw error;
    }
  },
  currentUser: async () => {
    try {
      const response = await api.get('/account/current');
      return response.data;
    } catch (error) {
      console.error('Fetching current user failed:', error);
      throw error;
    }
  },
};

export default api;
export { userApi };