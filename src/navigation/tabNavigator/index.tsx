import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/Home';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../utils/theme';
import ProfileScreen from '../../screens/Profile';
import {Text} from 'react-native';
import AnalyticsScreen from '../../screens/Analytics';
import {StyleSheet} from 'react-native';
import {fonts} from '../../utils/fonts';

const Tab = createBottomTabNavigator();

const HomeIcon = (focused: boolean) => (
  <Icon
    name="home"
    size={30}
    color={focused ? theme.colors.button : theme.colors.primary}
  />
);
const ProfileIcon = (focused: boolean) => (
  <Icon
    name="account"
    size={30}
    color={focused ? theme.colors.button : theme.colors.primary}
  />
);
const AnalyticsIcon = (focused: boolean) => (
  <Icon
    name="poll"
    size={30}
    color={focused ? theme.colors.button : theme.colors.primary}
  />
);
const Lable = (focused: boolean, value: string) => (
  <Text style={[focused && tabTextStyle.focused, tabTextStyle.label]}>
    {value}
  </Text>
);
const MainScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="LandingScreen"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 50,
          paddingBottom: 5,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => HomeIcon(focused),
          tabBarLabel: focused => Lable(focused.focused, 'Home'),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => ProfileIcon(focused),
          tabBarLabel: focused => Lable(focused.focused, 'Profile'),
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{
          tabBarIcon: ({focused}) => AnalyticsIcon(focused),
          tabBarLabel: focused => Lable(focused.focused, 'Analytics'),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;
const tabTextStyle = StyleSheet.create({
  label: {
    fontFamily: fonts.CarosSoftMedium,
    fontSize: 12,
  },
  focused: {
    color: theme.colors.button,
  },
});
