import React, {useCallback, useState} from 'react';
import AuthForm from './AuthForm';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../../entity/hook/useUser';
import {CreateUserPayload, LoginUserPayload} from '../../types';
import Snackbar from 'react-native-snackbar';
import {setUser} from '../../features/user/userSlice';

export enum screenType {
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
}

const AuthScreen = () => {
  const [screen, setScreen] = useState<screenType>(screenType.LOGIN);
  const navigation = useNavigation();
  const {loginUserMutate, signupUserMutate, getUser, loginUserIsLoading} =
    useUser();
  const dispatch = useDispatch();

  const handleSignup = useCallback(
    async (value: CreateUserPayload, {resetForm}: any) => {
      try {
        const res = await signupUserMutate(value);

        if (res.success) {
          await AsyncStorage.setItem('token', res.data);

          const userData = await getUser.refetch();
          dispatch(setUser(userData.data));

          Snackbar.show({
            text: 'Account created',
            duration: Snackbar.LENGTH_LONG,
          });

          resetForm({});
          navigation.navigate('MainScreen' as never);
        } else {
          setScreen(screenType.LOGIN);
          Snackbar.show({
            text: 'User already have an account, Please login here',
            duration: Snackbar.LENGTH_LONG,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch, getUser, navigation, signupUserMutate],
  );

  const handleLogin = useCallback(
    async (value: LoginUserPayload, {resetForm}: any) => {
      try {
        const res = await loginUserMutate(value);
        console.log(res, 'login');
        if (res.success) {
          await AsyncStorage.setItem('token', res.data);

          const userData = await getUser.refetch();
          dispatch(setUser(userData.data));

          Snackbar.show({
            text: 'Login Successful',
            duration: Snackbar.LENGTH_LONG,
          });

          resetForm({});
          navigation.navigate('MainScreen' as never);
        } else {
          setScreen(screenType.SIGNUP);
          Snackbar.show({
            text: 'User not found ! Create a new account',
            duration: Snackbar.LENGTH_LONG,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch, getUser, loginUserMutate, navigation],
  );

  return (
    <View style={{flex: 1}}>
      {screen === screenType.SIGNUP ? (
        <AuthForm
          initialValues={{email: '', password: ''}}
          buttonText="Save"
          screenName={screenType.SIGNUP}
          bottomText="Already Have An Account? Log IN"
          onPress={() => setScreen(screenType.LOGIN)}
          onSubmit={(value, {resetForm}) =>
            handleSignup(value as CreateUserPayload, {resetForm})
          }
          isUserLoading={loginUserIsLoading}
        />
      ) : (
        <AuthForm
          initialValues={{email: '', password: ''}}
          buttonText="Login"
          screenName={screenType.LOGIN}
          bottomText="Not an Member? Register"
          onPress={() => setScreen(screenType.SIGNUP)}
          onSubmit={handleLogin}
          isUserLoading={loginUserIsLoading}
        />
      )}
    </View>
  );
};

export default AuthScreen;
