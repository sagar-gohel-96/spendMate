import {useMutation, useQuery} from 'react-query';
import {UserService} from '../api/users';
import {useMemo} from 'react';
import {CreateUserPayload, LoginUserPayload} from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useUser = () => {
  const {data, isLoading, refetch} = useQuery('get-user', async () => {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      const res = await UserService.getUser(token);
      return res.data;
    }
  });

  const {
    data: loginUserData,
    isLoading: loginUserIsLoading,
    mutateAsync: loginUserMutate,
  } = useMutation(async (payload: LoginUserPayload) => {
    const res = await UserService.loginUser(payload);
    return res;
  });

  const {
    data: signupUserData,
    isLoading: signupUserIsLoading,
    mutateAsync: signupUserMutate,
  } = useMutation(async (payload: CreateUserPayload) => {
    const res = await UserService.signupUser(payload);
    return res;
  });

  const getUser = useMemo(() => {
    return {data, isLoading, refetch};
  }, [data, isLoading, refetch]);

  return {
    getUser,
    loginUserData,
    loginUserIsLoading,
    loginUserMutate,
    signupUserData,
    signupUserIsLoading,
    signupUserMutate,
  };
};
