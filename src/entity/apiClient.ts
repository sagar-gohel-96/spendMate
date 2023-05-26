import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://spenmate-backend.vercel.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
