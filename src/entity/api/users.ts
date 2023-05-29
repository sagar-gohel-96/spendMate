import {CreateUserPayload, LoginUserPayload} from '../../types';
import {apiClient} from '../apiClient';

const loginUser = async (payload: LoginUserPayload) => {
  try {
    // const res = await apiClient.post('/user/login', payload);

    const res = await fetch(
      'https://spenmate-backend.vercel.app/api/user/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    );

    const json = await res.json();
    return json;
    // return res.data;
  } catch (error) {
    console.log(error);
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

const signupUser = async (payload: CreateUserPayload) => {
  const res = await apiClient.post('/user/signup', payload);
  return res.data;
};
export const UserService = {
  loginUser,
  getUser,
  signupUser,
};
