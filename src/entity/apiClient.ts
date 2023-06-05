import axios from 'axios';

// const getToken = async () => {
//   const token = await AsyncStorage.getItem('token');
//   console.log('token', token);
//   return token;
// };
export const apiClient = axios.create({
  baseURL: 'https://spenmate-backend.vercel.app/api',
  headers: {
    'Content-Type': 'application/json',
    Token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDY1ZjU1M2M1Njg0YjNmNWUxY2U2ODYiLCJpYXQiOjE2ODU0NDA2NTJ9.x_FUp8yoxdTjy_2yQiughuKC6DID7u4p-Ic1Ma8u6Xg',
  },
});
