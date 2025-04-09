import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

// Attach token to every request if available
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
