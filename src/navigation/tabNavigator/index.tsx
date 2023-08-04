import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/Home';
import ProfileScreen from '../../screens/Profile';
import {TouchableOpacity, View} from 'react-native';
import AnalyticsScreen from '../../screens/Analytics';
import NotificationScreen from '../../screens/Notification';
import {Modalize, useModalize} from 'react-native-modalize';
import TransactionForm from '../../screens/Transaction/TransactionForm';
import {House, UserCircle, ChartBar, Bell, Plus} from 'phosphor-react-native';

const Tab = createBottomTabNavigator();
const IconSize = 36;

const HomeIcon = (focused: boolean) => (
  <House
    size={IconSize}
    weight={focused ? 'fill' : 'regular'}
    color="#99d98c"
  />
);
const ProfileIcon = (focused: boolean) => (
  <UserCircle
    size={IconSize}
    weight={focused ? 'fill' : 'regular'}
    color="#a2d2ff"
  />
);
const AnalyticsIcon = (focused: boolean) => (
  <ChartBar
    size={IconSize}
    weight={focused ? 'fill' : 'regular'}
    color="#f5ee9e"
  />
);
const NotificationIcon = (focused: boolean) => (
  <Bell size={IconSize} weight={focused ? 'fill' : 'regular'} color="#084b83" />
);

const TransactionIcon = (open, focused: boolean) => (
  <View>
    <TouchableOpacity
      onPress={() => {
        open();
      }}>
      <Plus size={IconSize} weight={focused ? 'fill' : 'regular'} />
    </TouchableOpacity>
  </View>
);

const EmptyScreen = () => null;

const MainScreen = () => {
  const {ref, open, close} = useModalize();

  return (
    <>
      <Modalize ref={ref}>
        <TransactionForm close={close} />
      </Modalize>
      <Tab.Navigator
        initialRouteName="LandingScreen"
        screenOptions={{
          tabBarStyle: {
            height: 70,
          },
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({focused}) => HomeIcon(focused),
            tabBarShowLabel: false,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Analytics"
          component={AnalyticsScreen}
          options={{
            tabBarIcon: ({focused}) => AnalyticsIcon(focused),
            tabBarShowLabel: false,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Transaction"
          component={EmptyScreen}
          options={{
            tabBarIcon: ({focused}) => TransactionIcon(open, focused),
          }}
        />
        <Tab.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            tabBarIcon: ({focused}) => NotificationIcon(focused),
            tabBarShowLabel: false,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({focused}) => ProfileIcon(focused),
            tabBarShowLabel: false,
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default MainScreen;
