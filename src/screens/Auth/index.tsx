import React, {useState} from 'react';
import AuthForm from './AuthForm';
import {View} from 'react-native';

export enum screenType {
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
}

const AuthScreen = () => {
  const [screen, setScreen] = useState<screenType>(screenType.LOGIN);
  console.log(screen);

  return (
    <View style={{flex: 1}}>
      {screen === screenType.SIGNUP ? (
        <AuthForm
          initialValues={{email: '', name: '', password: ''}}
          buttonText="Save"
          screenName="SignUp"
          bottomText="Already Have An Account? Log IN"
          onPress={() => setScreen(screenType.LOGIN)}
        />
      ) : (
        <AuthForm
          initialValues={{email: '', password: '', name: ''}}
          buttonText="Login"
          screenName="Login"
          bottomText="Not an Member? Register"
          onPress={() => setScreen(screenType.SIGNUP)}
        />
      )}
    </View>
  );
};

export default AuthScreen;
