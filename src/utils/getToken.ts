import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = (): string => {
  AsyncStorage.getItem('token').then(token => {
    console.log('token', token);
    return token;
  });
  return '';
};
