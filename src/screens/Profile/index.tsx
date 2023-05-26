import React, {useCallback} from 'react';
import {Text} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setUser} from '../../features/user/userSlice';
// import {useNavigation} from '@react-navigation/native';

const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  // const navigation = useNavigation();

  const logout = useCallback(async () => {
    await AsyncStorage.setItem('token', '');
    dispatch(setUser(null));
    navigation.navigate('LandingScreen' as never);
  }, [dispatch, navigation]);

  return <Text onPress={logout}>Logout</Text>;
};

export default ProfileScreen;
