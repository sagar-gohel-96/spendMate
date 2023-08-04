import React, {useCallback, useEffect, useState} from 'react';
import AuthForm from './AuthForm';
import {View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../../entity/hook/useUser';
import {CreateUserPayload, LoginUserPayload} from '../../types';
import Snackbar from 'react-native-snackbar';
import {setUser} from '../../features/user/userSlice';

export enum screenType {
  login = 'login',
  signup = 'signup',
}

const AuthScreen = () => {
  const [screen, setScreen] = useState<screenType>(screenType.login);
  const navigation = useNavigation();
  const route = useRoute<any>();

  useEffect(() => {
    if (route?.params?.type) {
      setScreen(route.params.type);
    }
  }, [route?.params?.type]);

  const {
    loginUserMutate,
    signupUserMutate,
    getUser,
    loginUserIsLoading,
    signupUserIsLoading,
  } = useUser();
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
          setScreen(screenType.login);
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
          setScreen(screenType.signup);
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
      {screen === screenType.signup ? (
        <AuthForm
          initialValues={{email: '', password: ''}}
          buttonText="Register"
          screenName={screenType.signup}
          bottomText="Already Have An Account? Log In"
          onScreenChange={() => setScreen(screenType.login)}
          onSubmit={(value, {resetForm}) =>
            handleSignup(value as CreateUserPayload, {resetForm})
          }
          isUserLoading={signupUserIsLoading}
        />
      ) : (
        <AuthForm
          initialValues={{email: '', password: ''}}
          buttonText="Login"
          screenName={screenType.login}
          bottomText="Not an Member? Register"
          onScreenChange={() => {
            setScreen(screenType.signup);
          }}
          onSubmit={handleLogin}
          isUserLoading={loginUserIsLoading}
        />
      )}
    </View>
  );
};

export default AuthScreen;
