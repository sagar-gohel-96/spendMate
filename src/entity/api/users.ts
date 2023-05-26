import {LoginUserPayload} from '../../types';
import {apiClient} from '../apiClient';

const loginUser = async (payload: LoginUserPayload) => {
  try {
    const res = await apiClient.post('/user/login', payload);
    return res.data;
  } catch (error) {
    console.log('error', error);
  }
};

const getUser = async (token: string) => {
  const res = await apiClient.get('/user', {
    headers: {
      token,
    },
  });
  return res.data;
};

export const UserService = {
  loginUser,
  getUser,
};
