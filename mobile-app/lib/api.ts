import { useUserStore } from '@/context/UserContext';
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

api.interceptors.request.use((config) => {
  const token = useUserStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
