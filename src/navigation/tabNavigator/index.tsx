import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/Home';
import ProfileScreen from '../../screens/Profile';
import {TouchableOpacity} from 'react-native';
import AnalyticsScreen from '../../screens/Analytics';
import NotificationScreen from '../../screens/Notification';
import {Modalize, useModalize} from 'react-native-modalize';
import TransactionForm from '../../screens/Transaction/TransactionForm';
import {
  House,
  Bell,
  Plus,
  ArrowLeft,
  ChartPieSlice,
  User,
} from 'phosphor-react-native';
import {theme} from '../../utils';

const Tab = createBottomTabNavigator();
const IconSize = 32;

const HomeIcon = (focused: boolean) => (
  <House
    size={IconSize}
    color={theme.colors.primary}
    weight={focused ? 'duotone' : 'regular'}
  />
);
const ProfileIcon = (focused: boolean) => (
  <User
    size={IconSize}
    color={theme.colors.primary}
    weight={focused ? 'duotone' : 'regular'}
  />
);
const AnalyticsIcon = (focused: boolean) => (
  <ChartPieSlice
    size={IconSize}
    color={theme.colors.primary}
    weight={focused ? 'duotone' : 'regular'}
  />
);
const NotificationIcon = (focused: boolean) => (
  <Bell
    size={IconSize}
    color={theme.colors.primary}
    weight={focused ? 'duotone' : 'regular'}
  />
);

const TransactionIcon = open => (
  <TouchableOpacity
    onPress={() => {
      open();
    }}>
    <Plus size={IconSize} color={theme.colors.primary} />
  </TouchableOpacity>
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
            tabBarLabelStyle: {color: theme.colors.primary},
            headerShown: false,
            tabBarShowLabel: false,
          }}
        />
        <Tab.Screen
          name="Analytics"
          component={AnalyticsScreen}
          options={{
            tabBarIcon: ({focused}) => AnalyticsIcon(focused),
            headerShadowVisible: true,
            headerLeft: () => <ArrowLeft size={32} />,
            tabBarShowLabel: false,
          }}
        />
        <Tab.Screen
          name="Transaction"
          component={EmptyScreen}
          options={{
            tabBarIcon: () => TransactionIcon(open),
            tabBarShowLabel: false,
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
