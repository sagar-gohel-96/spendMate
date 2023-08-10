import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://spenmate-backend.vercel.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const updateTokenHeader = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log(token, ' token');
    if (token) {
      apiClient.defaults.headers.common['Token'] = token;
    } else {
      console.log('token is missing ');
    }
  } catch (error) {
    console.log('Error retrieving token from AsyncStorage:', error);
  }
};
