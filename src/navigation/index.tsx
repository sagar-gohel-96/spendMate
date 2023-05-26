import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingScreen from '../screens/LandingScreen';
import MainScreen from './tabNavigator';
import AuthScreen from '../screens/Auth/';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const NavigationStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingScreen">
        {/* <Stack.Screen
        name="Profile"
        component={UserScreen}
        options={{headerShown: false}}
      /> */}
        <Stack.Screen
          name="AuthScreen"
          component={AuthScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LandingScreen"
          component={LandingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationStack;
