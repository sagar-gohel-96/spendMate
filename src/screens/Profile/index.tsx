import React, {useCallback} from 'react';
import {Text} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setUser} from '../../features/user/userSlice';

const ProfileScreen = ({navigation}: any) => {
  const dispatch = useDispatch();

  const logout = useCallback(async () => {
    await AsyncStorage.setItem('token', '');
    dispatch(setUser(null));
    navigation.navigate('LandingScreen' as never);
  }, [dispatch, navigation]);

  return <Text onPress={logout}>Logout</Text>;
};

export default ProfileScreen;
